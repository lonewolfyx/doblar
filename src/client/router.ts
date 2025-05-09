import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import { openApiRoutes } from 'virtual:doblar-routes'; // Routes from OpenAPI

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('./views/HomeView.vue')
	},
	{
		path: '/sss',
		name: 'hosme',
		component: () => import('./views/HomeView.vue')
	},
	{
		path: '/items-example',
		name: 'items-example',
		// You would typically create a component for this view
		component: () => import('./views/ItemsExampleView.vue')
	}
]

// Dynamically add routes from OpenAPI schema if needed
// This is a more advanced use case. For now, App.vue just checks for existence.
/*
openApiRoutes.forEach(route => {
  if (route.method.toUpperCase() === 'GET') { // Example: only add GET routes
    const path = route.originalPath.replace(/{(\w+)}/g, ':$1'); // Convert {param} to :param
    routes.push({
      path: path,
      name: route.name,
      component: () => import('../views/GenericView.vue'), // A generic component or map to specific ones
      props: true // If you want path params as props
    });
  }
});
*/

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), // BASE_URL is provided by Vite
	routes
})

export default router
