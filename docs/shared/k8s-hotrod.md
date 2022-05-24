Follow the steps in this section to install a sample application named
[HotR.O.D](https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod),
and generate tracing data.

1. Use the HotROD install script below to create a `sample-application` namespace
and deploy HotROD application on it:

```bash
curl -sL https://github.com/SigNoz/signoz/raw/main/sample-apps/hotrod/hotrod-install.sh \
  | HELM_RELEASE=my-release SIGNOZ_NAMESPACE=platform bash
```

2. Use the following command to generate load:

```bash
kubectl --namespace sample-application run strzal --image=djbingham/curl \
  --restart='OnFailure' -i --tty --rm --command -- curl -X POST -F \
  'locust_count=6' -F 'hatch_rate=2' http://locust-master:8089/swarm
```

3. Browse to `http://localhost:3301` and see the metrics and traces for your sample application.
<!--This step needs more details including a screenshot but I wasn't able to install SigNoz on Kubernetes yet -->

4. Use the following command to stop load generation:

```bash
kubectl -n sample-application run strzal --image=djbingham/curl \
  --restart='OnFailure' -i --tty --rm --command -- curl \
  http://locust-master:8089/stop
```

Go to [Kubernetes Operate](/docs/operate/kubernetes) section for detailed instructions.