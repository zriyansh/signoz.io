**Method 1: Updating entrypoint in task definition**

- Using default networking mode i.e. **Bridge**:
    
    ```json
    {
          ...,
          "entryPoint": [
            "sh",
            "-c",
            "export OTEL_EXPORTER_OTLP_ENDPOINT=\"http://172.17.0.1:4317\"; <Application Startup Commands>"
          ],
    			"command": [],
    			...
    }
    ```
    
- Using **Bridge** mode with custom docker network
    
    If you are using custom docker networking, you would have to use `ExtraHosts` in your task definition. 
    
    ```json
    {
        ...
        "extraHosts": [
          {
            "hostname": "signoz-collector",
            "ipAddress": "host-gateway"
          }
          ...
        ]
    }
    ```
    
    And the `entryPoint` will look like:
    
    ```json
    {
          ...,
          "entryPoint": [
            "sh",
            "-c",
            "export OTEL_EXPORTER_OTLP_ENDPOINT=\"http://signoz-collector:4317\"; <Application Startup Commands>"
          ],
    			"command": [],
    			...
    }
    ```
    
- If network mode is not **Bridge**, and AWS EC2 instance:
    
    ```json
    {
          ...,
          "entryPoint": [
            "sh",
            "-c",
            "export OTEL_EXPORTER_OTLP_ENDPOINT=\"http://$(curl http://169.254.169.254/latest/meta-data/local-ipv4):4317\"; <Application Startup Commands>"
          ],
    			"command": [],
    			...
    }
    ```
    
- If network mode is not **Bridge**, and GCP instance:
    
    ```json
    {
          ...,
          "entryPoint": [
            "sh",
            "-c",
    				'export OTEL_EXPORTER_OTLP_ENDPOINT="http://$(curl "http://169.254.169.254/computeMetadata/v1/instance/network-interfaces/0/ip?recursive=true&alt=text" -H "Metadata-Flavor: Google"):4317"; <Application Startup Commands>'
          ],
    			"command": [],
    			...
    }
    ```
    
    Ref: https://www.baeldung.com/linux/cloud-ip-meaning