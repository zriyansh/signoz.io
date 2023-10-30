### Step 2: Create SigNoz OtelCollector Config

Go to AWS Parameter Store and create a new parameter with the name `/ecs/signoz/otelcol-daemon.yaml`.

The value of this parameter should be the content of the SigNoz OtelCollector config file as shown below.