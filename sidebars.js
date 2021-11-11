// module.exports = {
//   someSidebar: {






//     'getting-started'
//     Deployment: ['deployment/requirement','deployment/docker','deployment/docker_swarm', 'deployment/helm_chart','deployment/troubleshooting'],
//     Overview: ['introduction', 'architecture', 'features','contributing','community','roadmap','faq'],
//     Configuration: ['configuration/deep_storage', 'configuration/retention_period'],
//     Instrumentation: ['instrumentation/overview','instrumentation/python', 'instrumentation/nodejs', 'instrumentation/java', 'instrumentation/golang'],
//     // Features: ['mdx'],
//   },
// };


module.exports = {
  docs: [
    {
      id: "getting-started",
      type: "doc",
    },
    {
      label: "Install SigNoz",
      type: "category",
      items: [
        "deployment/requirement",
        'deployment/docker',
        'deployment/docker_swarm',
        'deployment/helm_chart',
        'deployment/troubleshooting'
      ],
    },
 
    {
      label: "Instrumentation",
      type: "category",
      items: [
        'instrumentation/overview',
        'instrumentation/python',
        'instrumentation/nodejs',
        'instrumentation/java',
        'instrumentation/golang',   
        'instrumentation/dotnet',

      ],
    },
    {
      label: "User Guide",
      type: "category",
      items: [
        'userguide/overview',
        'userguide/metrics-dashboard',
        'userguide/prometheus-metrics',
        'userguide/retention-period',
        'userguide/service-map',
        'userguide/trace-details',
      ],
    },
    {
      label: "Configuration",
      type: "category",
      items: [
        'configuration/deep_storage', 
        'configuration/retention_period',
      ],
    },
    {
      id: "architecture",
      type: "doc",
    },
    {
      id: "contributing",
      type: "doc",
    },
    {
      id: "community",
      type: "doc",
    },
    {
      id: "roadmap",
      type: "doc",
    },
    {
      id: "faq",
      type: "doc",
    },
  ]
}