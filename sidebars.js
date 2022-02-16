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
      label: 'Install',
      link: {
        type: 'generated-index',
        title: 'Install SigNoz',
        description: 'To install SigNoz, follow the instructions in the sections below.',
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
      label: "Instrument your app",
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
      type: 'category',
      label: 'Operate',
      link: {
        type: 'generated-index',
        title: 'Operate',
        description: 'The following sections provide an overview of the activities that are required to successfully operate SigNoz. Based on your environment, proceed to one of the sections below.',
        slug: '/operate',
      },
      items: [
        'operate/docker-standalone',
        'operate/docker-swarm',
        'operate/kubernetes'

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
      link: {
        type: 'generated-index',
        title: 'Tutorials',
        description: 'SigNoz tutorials are step-by-step training exercises that guide you through monitoring your applications and infrastructure.',
        slug: '/tutorials',
      },
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
    {
      label: "Others",
      type: "category",
      items: [
        'telemetry',
      ],
    },
  ]
}