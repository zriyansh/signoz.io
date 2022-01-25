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
      id: "introduction",
      type: "doc",
    },
    {
      type: 'category',
      label: 'Install SigNoz',
      link: {
        type: 'generated-index',
        title: 'Install SigNoz',
        description: 'To install SigNoz, follow the instructions in the next sections, depending on your environment.',
        slug: '/install',
      },
      items: [
        "install/docker-standalone",
        'install/docker-swarm',
        'install/kubernetes',
        'install/troubleshooting'
      ],
    },
    {
      label: "Instrumentation",
      type: "category",
      items: [
        'instrumentation/overview',
        'instrumentation/python',
        'instrumentation/fastapi',
        'instrumentation/nodejs',
        'instrumentation/nestjs',
        'instrumentation/java',
        'instrumentation/golang',   
        'instrumentation/dotnet',
        'instrumentation/ruby-on-rails',
      ],
    },
    {
      label: "User Guides",
      type: "category",
      items: [
        'userguide/overview',
        'userguide/metrics-dashboard',
        'userguide/prometheus-metrics',
        'userguide/alerts-management',
        'userguide/retention-period',
        'userguide/service-map',
        'userguide/trace-details',
      ],
    },
    {
      label: "Tutorials",
      type: "category",
      items: [
        'tutorial/jvm-metrics',
        'tutorial/kubernetes-infra-metrics',
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