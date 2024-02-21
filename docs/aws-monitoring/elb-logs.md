---
id: elb-logs
title: Send your ELB logs to SigNoz
---

If you happen to have your Load Balancer logs getting collected in your AWS S3 and you want a unified platform to visualize them?, In this tutorial, you will configure how you can send any kind of logs to SigNoz otel collector endpoint from your S3 bucket using Lambda function.

**Here’s a quick summary of what we’ll be doing in this detailed article.** 

1. Have some data in your S3 bucket.
2. Make a lambda function in AWS.
3. Add trigger to the lamba function (your S3 bucket, set trigger as PUT/All object creation).
4. Add required policy so you can run the function.
5. Load the objects from S3.
6. Perform log parsing and convert them to JSON dictionary. 
7. Send them to SigNoz otel-collector endpoint.


## Assumptions

1. You are using SigNoz cloud edition. 
2. You have an AWS account with admin privileges.


## Creating / Configuring your S3 bucket

Create an S3 bucket if you don’t already have one and upload some data to it. It’s fairly easy to do this, just create a S3 bucket and upload some .json, .csv, .log, or any format you wish (even .gz and .zip). By default, the ELB logs are automatically saved in .gzip format in your S3 bucket (if you have configured automatic logs collection). Refer to [this link](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/enable-access-logging.html#enable-access-logs) to know more. 

Keep in mind, we’ll be converting all logs to json before sending so you might need to do some additional preprocessing of logs. 

If you don’t already have a S3 bucket, here’s how to make one.

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-create_bucket_1.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

Give you bucket a name and keep the settings to default, works for most of the parts.

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-create_bucket_2.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

When your S3 bucket get’s created, click on upload from the UI and upload your files to the bucket.

In this tutorial, I’ll be assuming you already have some data in your S3 bucket to start with. 

**Note:** Since we’ll parsing out data from s3, we assume all the data is of same format. 

Example - We have a s3 bucket for ELB logs then all the data inside a bucket will be of that same format only (eg, if a file is .csv, all files will be .csv only, why? Can’t I have different file formats? Sure you can have, its just adds a couple of extra steps and different parsing function). 

The general header(table) format of ELB logs are:

```jsx
elb_headers= ["type","time","elb","client_port","target_port",
"request_processing_time","target_processing_time","response_processing_time",
"elb_status_code","target_status_code","received_bytes","sent_bytes","request",
"user_agent","ssl_cipher","ssl_protocol","target_group_arn","trace_idd",
"domain_name","chosen_cert_arn","matched_rule_priority",
"request_creation_time","actions_executed","redirect_url",
"error_reason","target_port_list","target_status_code_list",
"classification","classification_reason"]
```

Note that these headers are just for name sake, you can change them if you wish to but it is not advisable. You might have noticed in `elb_headers`, I have mentioned `trace_idd` and not `trace_id`. This is not a typo, ELB logs have `trace_id` as the header name but payload structure SigNoz recommends is shown below:

```jsx
[
	{
		"timestamp": <uint64>,
		"trace_id": <hex string>,
		"span_id": <hex string>,
		"trace_flags": <int>
		"severity_text": <string>,
		"severity_number": <int>,
		"attributes": <map>,
		"resources": <map>,
		"body": <string>,
	}
]
```

Source - https://signoz.io/docs/userguide/send-logs-http/

`trace_id` here is of the format `<hex string>` but we’ll sending everything as string json for simplicity and less data processing and parsing, hence the change in field name from trace_id to trace_idd. [If you use `trace_id` and send the trace_id as a string, you’ll get 400 error, this can resolved by further logs formatting]

## Understanding how lambda function work

For the scope of this article, understand that if you successfully attach your lambda function with the s3 bucket and configure it correctly (we’ll talk about that in a bit), any new additions / deletion / copy / PUT, etc requests made to the s3 bucket will trigger the lambda function the code written in the lambda function will get executed. 

### Creating a lambda function

Follow along to create a Lambda Function:-

**Step 1:** Go to your AWS console and search for AWS Lambda, go to `Functions` as shown in the screenshot below and click on `Create Function`. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_1.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 2:** Choose the `Author from scratch` checkbox and proceed to fill in the function name. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_2.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 3:** Choose `Python 3.x` as the Runtime version, `x86_64` as Architecture (mostly), and keep other settings as default. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_3.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 4:** Select `Create a new role with basic Lambda permissions`for now, we’ll requiring more permissions down the lane. So for now, select this option. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_4.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

Once you are done configuring the lambda function, you’ll see it get created here. Feel free to move around and see what all things AWS Lambda offers. 

### Configuring Policies for Lambda function

As said in Step 4 previously, we need extra permissions in order to access the S3 Bucket for execution of our Lambda code, follow along to set it up. 

**Step 1:** Scroll down from your Lambda page, you’ll a few tabs there. Go to `Configurations` and select `Permissions` from the left sidebar. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_5.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 2:** Click on the `Execution Role name`'s link, it will take us to AWS IAM page. Here, we’ll be a policy to get full S3 access.

**Step 3:** Once here, click on the `Add permissions` button and select `Attach policies` from the drop down list. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_6.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 4:** Search “S3” and you’ll a policy named `AmazonS3FullAccess`select that and proceed. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_7.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Note:** Giving full S3 access might be okay for testing purposes, do consult with you admin before running your lambda function with full S3 access permission in production. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-policies-used.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

Refer to the above image as a reference to all the policy names you might want to add to your lambda function. There can be a possibility of insufficuent priviledges if these policies are not added. 

Congrats, you are just done with one of the major hurdle in running your code. Now, let’s add a trigger. 

### Adding Triggers

You need to use the Lambda console to build a trigger so that your function can be called immediately by another AWS service (S3, in our case). A trigger is a resource you set up to enable your function to be called by another AWS service upon the occurrence of specific events or conditions. 

A function may have more than one trigger. Every trigger functions as a client, independently calling your method, and Lambda transfers data from a single trigger to each event it passes to your function.

To setup our trigger, follow along:-

**Step 1:** Click on the `+ Add trigger`button from the Lambda console. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_8.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 2:** Select `S3` from the first drop down of AWS services list. Pick you S3 bucket for the second field. 

**Step 3:** For the Event types field, you can select any number of options you wish. The trigger will occur depending upon what option(s) you choose here. By default, the `All object create events` will be selected. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_9.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

Verify the settings and click on `Add` button at bottom right to add this trigger. You could add more than one trigger, but we’ll stick to just one for now. 

### Adding Request Layer

We will be using python’s `request` module and by default, you do not get ‘requests’ module by default in the Lambda. Why? See the attached image and [this link](https://aws.amazon.com/blogs/compute/upcoming-changes-to-the-python-sdk-in-aws-lambda/). 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-upcoming-changes.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

So, in order to use the requests module, we need to add it explicitly as a layer and then only we can use it. There might be some alternatives, but we’ll stick with what works and tested. 

Anyways, refer to the below attached steps to create a zip of the request module and add it as a layer to make it work on AWS lambda. Steps for which are described ahead. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-layer_1.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

The commands you’d need:

```jsx
mkdir python
cd python

pip install --target . requests
zip -r dependencies.zip ../python 

```

Here’s the screenshot of the dependencies.zip file which we’ll be uploading to AWS soon. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-layer_2.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 1:** To upload your zip file, go to AWS Lambda > Layers and click on `Create Layer`. [Not inside your specific Lambda function, just the landing page of AWS Lambda]. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-layer_3.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 2:** You’ll be redirected to Layer configurations page, here, give a name to your layer, an optional description, select `Upload a .zip file` , click on `Upload` and locate the requirements.zip file. 

**Step 3:** Select your desired architecture and pick `Python 3.x` as your runtime. Hit `Create`. You layer as now been created. Now lets connect it to our Lambda function which we created to send logs to SigNoz. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-layer_4.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 4:** Go to your Lambda function, scroll down to Layers section and on the right of it, you’ll find a button that says `Add a layer` to click on. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-layer_5.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

**Step 5:** Pick `Custom layers` from the checkbox and select your custom layer from the given drop down below and then click on the button `Add`. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-layer_6.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

Well, that’s it. You have successfully added requests module to run in your code area. Without adding this layer, you’d get a ‘request module not found error’.

### The Lambda Function

Now finally we arrive at the most important section of this article, the code. 

Lets break down the code in smaller chunks to make you understand. 

1. **Import Required Modules:**
    
    ```python
    import json
    import gzip
    import boto3
    import requests
    import shlex
    ```
    
    - Import necessary Python modules:
        - `json`: for JSON encoding and decoding.
        - `gzip`: for decompressing gzipped content.
        - `boto3`: AWS SDK for Python, used for interacting with AWS services.
        - `requests`: for making HTTP requests.
        - `shlex`: for splitting shell-like syntax.
2. **Create S3 Client:**
    
    ```python
    s3 = boto3.client('s3')
    ```
    
    - Create an S3 client using the AWS SDK (boto3).
3. **Define Function to Convert Log Line to JSON:**
    
    ```python
    def convert_log_line_to_json(line):
        # ...
    ```
    
    - Define a function `convert_log_line_to_json` that takes a log line as input and converts it into a dictionary with predefined headers.
4. **Lambda Function Handler:**
    
    ```python
    def lambda_handler(event, context):
        # ...
    ```
    
    - Define the Lambda function handler, which is the entry point for AWS Lambda execution.
5. **Specify S3 Bucket Name:**
    
    ```python
    bucket_name = '<name_of_your_bucket>'
    ```
    
    - Set the S3 bucket name where the log files are stored.
6. **List Objects in the S3 Bucket:**
    
    ```python
    response = s3.list_objects_v2(Bucket=bucket_name)
    ```
    
    - Use the S3 client to list all objects in the specified bucket.
7. **Iterate Through Objects:**
    
    ```python
    for obj in response['Contents']:
        # ...
    ```
    
    - Iterate through each object in the S3 bucket.
8. **Check if Object is a Log File:**
    
    ```python
    if obj['Key'].endswith('.log.gz'):
        # ...
    ```
    
    - Check if the object is a gzipped log file based on its file extension.
9. **Download and Decompress Log File:**
    
    ```python
    file_key = obj['Key']
    file_obj = s3.get_object(Bucket=bucket_name, Key=file_key)
    file_content = file_obj['Body'].read()
    decompressed_content = gzip.decompress(file_content)
    ```
    
    - Retrieve the gzipped log file from S3, read its content, and decompress it.
10. **Convert Bytes to String:**
    
    ```python
    json_data = str(decompressed_content, encoding='utf-8')
    ```
    
    - Convert the decompressed content from bytes to a UTF-8 encoded string.
11. **Split String into Lines:**
    
    ```python
    lines = json_data.strip().split('\\n')
    ```
    
    - Split the string into a list of lines based on the newline character.
12. **Convert List of Strings to JSON-formatted String:**
    
    ```python
    result = json.dumps(lines, indent=2)
    ```
    
    - Convert the list of strings into a nicely formatted JSON string.
13. **Load JSON-formatted String into List of Strings:**
    
    ```python
    list_of_strings = json.loads(result)
    ```
    
    - Load the JSON-formatted string back into a list of strings.
14. **Convert Each Log Line to JSON Object:**
    
    ```python
    json_data = [convert_log_line_to_json(line) for line in list_of_strings]
    ```
    
    - Use the `convert_log_line_to_json` function to convert each log line string into a JSON object.
15. **Specify HTTP Endpoint:**
    
    ```python
    http_url = 'https://ingest.in.signoz.cloud:443/logs/json/'
    
    ```
    
    - Set the HTTP endpoint where the JSON data will be sent.
16. **Send JSON Data to HTTP Endpoint:**
    
    ```python
    response = requests.post(http_url, json=json_data, headers=req_headers)
    ```
    
    - Use the `requests` library to send a POST request to the specified HTTP endpoint with the JSON data.
17. **Print Information about the Sent Data:**
    
    ```python
    print(f"Sent data to {http_url}. Response: {response.status_code}")
    ```
    
    - Print information about the sent data and the received HTTP response status code.

This code essentially downloads gzipped log files from an S3 bucket, decompresses them, converts the log lines into JSON objects, and sends the resulting JSON data to a specified HTTP endpoint.

Here’s the complete code with comments:

```python
import json
import gzip
import boto3 
import requests
import shlex

# Create an S3 client
s3 = boto3.client('s3')

# Function to convert a log line into a JSON object
def convert_log_line_to_json(line):
    # Define the headers to be used for the JSON keys
    headers = ["type", "time", "elb", "client:port", "target:port", "request_processing_time", "target_processing_time", "response_processing_time", "elb_status_code", "target_status_code", "received_bytes", "sent_bytes", "request","user_agent", "ssl_cipher", "ssl_protocol", "target_group_arn", "trace_idd", "domain_name", "chosen_cert_arn", "matched_rule_priority", "request_creation_time", "actions_executed", "redirect_url", "error_reason", "target:port_list", "target_status_code_list", "classification", "classification_reason"]

    # Split the log line using shell-like syntax (keeping quotes, etc.)
    res = shlex.split(line, posix=False)

    # Create a dictionary by zipping headers and log line parts
    return dict(zip(headers, res))

# Lambda function handler
def lambda_handler(event, context):
    # S3 bucket name
    bucket_name = '<name_of_your_bucket>'

    # List all objects in the specified S3 bucket
    response = s3.list_objects_v2(Bucket=bucket_name)

    # Iterate through each object in the bucket
    for obj in response['Contents']:
        # Check if the object is a gzipped log file
        if obj['Key'].endswith('.log.gz'):
            file_key = obj['Key']

            # Download the gzipped file content
            file_obj = s3.get_object(Bucket=bucket_name, Key=file_key)
            file_content = file_obj['Body'].read()

            # Decompress the gzipped content
            decompressed_content = gzip.decompress(file_content)

            # Convert bytes to string
            json_data = str(decompressed_content, encoding='utf-8')

            # Split the string into lines
            lines = json_data.strip().split('\n')

            # Convert the list of strings into a JSON-formatted string
            result = json.dumps(lines, indent=2)

            # Load the JSON-formatted string into a list of strings
            list_of_strings = json.loads(result)

            # Convert each log line string into a JSON object
            json_data = [convert_log_line_to_json(line) for line in list_of_strings]
            
            req_headers = {
                     'signoz-access-token': '<SIGNOZ_INGESTION_KEY>',
                     'Content-Type': 'application/json'
                }
            # Specify the HTTP endpoint for sending the data
            http_url = 'https://ingest.in.signoz.cloud:443/logs/json/'  # Replace with your actual URL

            # Send the JSON data to the specified HTTP endpoint
            response = requests.post(http_url, json=json_data, headers=req_headers)

            # Print information about the sent data and the response received
            print(f"Sent data to {http_url}. Response: {response.status_code}")
```

Here’s how a raw, unprocessed ELB log line looks like:

```python
https 2024-01-01T23:58:03.391277Z app/abc-prod-alb/0b46e552ds5b44da 35.244.22.76:41802 192.1.0.114:80 0.000 1.077 0.000 200 200 1430 923 "POST https://api.abcs.com:4463/suporodv2/v1/get-result/ HTTP/1.1" "SFDC-Callout/59.0" ECDHE-RSA-AES128-GCM-SHA256 TLSv1.2 arn:aws:elasticloadbalancing:ap-south-1:8429181216651:targetgroup/ecs-Sabc-P-Private-SU-API/02f1623fsddec2691ce "Root=1-65343518a-72123e913f71cb2e20213a3ea9" "api.example-sabcs.com" "session-reused" 98 2024-01-01T23:58:02.313000Z "forward" "-" "-" "192.1.1.114:80” "200" "-" "-"
```

You can match each field with corresponding header in the code. 

The above code is to send ELB logs to SigNoz endpoint. 

**Note:** This is a working code but be careful copy pasting the entire code, it might lead to ingestion of huge amount to data if not configured correctly. 

Other than the above explanation and the code comments, in a nutshell, what the this code does is: 

Sends the parsable content of **ENTIRE** S3 bucket whenever the lambda function gets triggered. It gets triggered by the condition you set above. Let’s mention that again here. 

> **Step 3:** For the Event types field, you can select any number of options you wish. The trigger will occur depending upon what option(s) you choose here. By default, the `All object create events` will be selected.
> 

Lets say you add something to your S3 bucket, it may / may not trigger this lambda function or if you have setup your s3 as if it automatically stores all your ELB/VPC logs, segregated in different folders, so whenever any new log gets added, the function will get triggered and send all the S3 data. 

This is obviously not what everyone expects, ideal case would be to have a mass log transfer once the first connection is made to SigNoz otel-collector (which then they later get stored in gp2/gp3 storageClass of EBS), and then send logs lines of only the recently logged one. 

To achieve this functionality, you need to add few conditions to the code. 

1. Assuming all standard log lines have a timestamp field
2. Parse and select the timestamp field from the log line and add it before the `response = requests.post(http_url, json=json_data)` line as a if else condition to only send logs which are x days older (say 3 days). 

So, the function now will first check the log timestamp and only send those logs which are 3 days older (say) or even a few hours old. 

Let’s consider the below pseudo code for better understanding:

```python
   from datetime import datetime, timedelta

   # Your given timestamp
   given_timestamp_str = "2024-01-01T23:58:02.231919Z"
   given_timestamp = datetime.fromisoformat(given_timestamp_str.replace('Z', '+00:00'))

   # Current time
   current_time = datetime.utcnow()

   # Calculate the time difference
   time_difference = current_time - given_timestamp

   # Check if the time difference is less than 3 days
   if time_difference < timedelta(days=3):
       # Run your specific function here
       print("Running the specific function.")
   # ADD THE response = requests.post(http_url, json=json_data) LINE HERE

   else:
       print("Time difference exceeds 3 days. Function will not run.")
```

Feel free to modify any part of the code if you wish to. 

### Running the code locally.

If you want to run the entire setup locally in your laptop for testing purposes. Here’s the reference code for you: 

```python
import os
import gzip
import json
import requests
import shlex

def convert_log_line_to_json(line):
    headers= ["type","time","elb","client_port","target_port","request_processing_time","target_processing_time","response_processing_time","elb_status_code","target_status_code","received_bytes","sent_bytes","request","user_agent","ssl_cipher","ssl_protocol","target_group_arn","trace_idd","domain_name","chosen_cert_arn","matched_rule_priority","request_creation_time","actions_executed","redirect_url","error_reason","target_port_list","target_status_code_list","classification","classification_reason"]
    res = shlex.split(line, posix = False)
    
    # data = line.strip().split()
    return dict(zip(headers, res))

def process_log_file(file_path):
    with gzip.open(file_path, 'r') as f:
        log_data = f.read().decode('utf-8') 
        # print(log_data)
        
        lines = log_data.strip().split('\n')
        result = json.dumps(lines, indent=2)
        
        list_of_strings = json.loads(result)
        # print(log_data)
        
        json_data = [convert_log_line_to_json(line) for line in list_of_strings]
        # print(json_data)    
        
        print(json.dumps(json_data, indent=2))
        # print(json_data[0]["time"])
        req_headers = {
                     'signoz-access-token': '<SIGNOZ_INGESTION_KEY>',
                     'Content-Type': 'application/json'
                }

        http_url = 'https://ingest.in.signoz.cloud:443/logs/json/'  # Replace with your actual URL
        response = requests.post(http_url, json=json_data, headers=req_headers)
        
        print(f"Sent data to {http_url}. Response: {response.status_code}")

def main():
    root_folder = '<folder_name>'

    for root, _, files in os.walk(root_folder):
        for file in files:
            if file.endswith('.log.gz'):
                file_path = os.path.join(root, file)
                process_log_file(file_path)

if __name__ == '__main__':
    main()
```

**Note:** Add some log files to the folder, it can be nested as well, the code will checks all subfolders and find for log files that end with extension `.log.gz`. You can change it to match whichever file you want. 

Here’s some local testing results: 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-local_setup_json.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

### Testing your Lambda function

After you are done writing your code, its time to deploy it and test if its actually works. It will be good to uncomment the `print(...)` lines I added in the code as comment to see at each point how the logs are getting formatted. 

But before that, you might want to increase the timeout setting for your lambda function as this data transfer from S3 to external endpoint can take a few minutes and by default, lambda function times out in 3 seconds. 

To increase the timeout time, go to `Configuration` → `General Configuration` → Edit button and set it under 10 mins. Usually the code executes between 1-4 minutes at max. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-timeout_increase.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

After you are done with increasing the timeout setting, go to your lambda code editor and click on the `test` button dropdown option,. Configure a new test case (new event) as S3 PUT and click save. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_test_event.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

Now you are all set. Whenever you make any change in the code and want to test it out, deploy the code first (works as Save button) and then click on test button after its fully deployed. 

Attached below is a screenshot of sending VPC logs (not ELB) to SigNoz endpoint. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_10.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

### Test Case and OUTPUT

If you are able to successfully send the logs, this is how they’ll get sent (ps - this is the output as I have printed the json formatted data just to see what gets sent). 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_output.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>

## Visualize the logs in SigNoz

You’ll immediately see a flood of logs in SigNoz logs section. You can even switch to Live monitoring of Logs. Just click on any log line to see the details. 

<figure data-zoomable align='center'>
    <img src="/img/docs/elb/elb-logs-lambda_12.webp" alt="A sample log line of the logs sent from AWS Lambda"/>
    <figcaption><i>A sample log line of the logs sent from AWS Lambda</i></figcaption>
</figure>

