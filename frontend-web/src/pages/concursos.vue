<template>
  <v-row>
    <v-col cols="4">
      <v-text-field
        :model-value="cpf"
        @update:model-value="updateCpf"
        v-maska.mask="'###.###.###-##'"
        label="Pesquisar concurso por CPF"
        prepend-inner-icon="mdi-magnify"
        :clearable="!app.loading" :disabled="app.loading"
        :loading="app.loading"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-input
        v-show="profissoesCandidato.length > 0"
        messages="Profissões do candidato"
      >
        <v-chip v-for="prof in profissoesCandidato">
          {{ prof }}
        </v-chip>
      </v-input>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="concursos"
        height="calc(100vh - 264px)"
        :loading="app.loading"
      >
        <template v-slot:item.profissoes="{ item }">
          <v-chip v-for="profissao in item.profissoes">
            {{ profissao }}
          </v-chip>
        </template>
        <template v-slot:item.codigo="{ item }">
          <v-btn
            variant="text"
            @click="buscarCandidato(item.codigo)"
          >
            {{ item.codigo }}
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup>
import { listarConcursos, concursoPorCpf } from "@/services/concursos"
import { vMaska } from "maska/vue"
import debounce from "lodash.debounce"
import { useAppStore } from "@/stores/app"



const router = useRouter()

const buscarCandidato = (codigo) => {
  router.push({ name: "candidatos", query: { codigo } })
}

const app = useAppStore()

const profissoesCandidato = ref([])
const concursos = ref([])

const cpf = ref('')
const _updateCpf = async (newValue) => {
  cpf.value = newValue
  if (newValue === undefined || newValue === null || newValue === '') {
    const response = await listarConcursos()
    concursos.value = response
    profissoesCandidato.value = []
    return
  }
  if (newValue.length === 14) {
    const response = await concursoPorCpf(newValue)
    concursos.value = response.concursos
    profissoesCandidato.value = response.profissoesCandidato
  }
}
const updateCpf = debounce(_updateCpf, 500)

const headers = [
  { title: "Órgão", value: "nome" },
  { title: "Edital", value: "edital" },
  { title: "Código", value: "codigo" },
  { title: "Profissões", value: "profissoes" }
]

const route = useRoute()

onBeforeMount(() => {
  _updateCpf(route.query.cpf)
})
</script>
