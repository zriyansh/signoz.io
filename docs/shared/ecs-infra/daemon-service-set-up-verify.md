### Step 3: Configure Daemon Service

To configure the daemon service, you need to run the following command with the proper values for the parameters.

```bash
export CLUSTER_NAME=<your-ecs-cluster-name>
export REGION=<your-ecs-region>
export COMMAND=--config=env:SIGNOZ_CONFIG_CONTENT
export SIGNOZ_CONFIG=/ecs/signoz/otelcol-daemon.yaml

aws cloudformation create-stack --stack-name AOCECS-daemon-${CLUSTER_NAME}-${REGION} \
    --template-body file://daemon-template.yaml \
    --parameters ParameterKey=ClusterName,ParameterValue=${CLUSTER_NAME} \
    ParameterKey=CreateIAMRoles,ParameterValue=True \
		ParameterKey=command,ParameterValue=${COMMAND} \
		ParameterKey=SigNozConfig,ParameterValue=${SIGNOZ_CONFIG} \
    --capabilities CAPABILITY_NAMED_IAM \
    --region ${REGION}
```

### Step 4: Verify Daemon Service

To verify that the daemon service is running, you can run the following command.

```bash
aws ecs list-tasks --cluster ${CLUSTER_NAME} --region ${REGION}
```

You should see the task ARN of the daemon service in the output.

### Step 5: Verify Data in SigNoz Cloud

To verify that the data is being sent to SigNoz Cloud, you can go to the
SigNoz Cloud dashboard page and import the dashboards below:

- [instance-metrics.json](https://github.com/SigNoz/dashboards/raw/chore/ecs-dashboards/ecs-infra-metrics/instance-metrics.json)
- [hostmetrics-with-variable.json](https://github.com/SigNoz/dashboards/raw/main/hostmetrics/hostmetrics-with-variable.json)

You should see the metrics for your ECS cluster in the dashboard.