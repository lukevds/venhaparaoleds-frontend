/**
 * Preferi definir rotas manualmente porque fica mais facil de definir as
 * propriedades de cada rota. Acho melhor navegar por nome.
 */

import DefaultLayout from "@/layouts/default.vue"
import Candidatos from "@/pages/candidatos.vue"
import Concursos from "@/pages/concursos.vue"

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
          { path: "", redirect: { name: "candidatos"}},
          {
            name: "candidatos",
            path: "candidatos",
            component: Candidatos,
            meta: { tabTitle: "Candidatos" }
          },
          {
            name: "concursos",
            path: "concursos",
            component: Concursos,
            meta: { tabTitle: "Concursos" }
          }
        ]
    },
]

export default routes