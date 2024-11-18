const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue')},
      {path: 'page1', component: () => import('pages/PageOne.vue')},
      {
        path: 'region-standard',
        component: () => import('pages/RegionCharts.vue'),
        props: {
          timeUnit: 'daily',
          kpiType: 'standard',
        }
      },
       {
        path: 'region-flex',
        component: () => import('pages/RegionCharts.vue'),
        props: {
          timeUnit: 'daily',
          kpiType: 'flex',
        }
      },
    ]
  },
  {},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
