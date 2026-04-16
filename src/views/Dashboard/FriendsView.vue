<template>
  <main class="mt-20 p-8 flex-grow">
    <div class="max-w-7xl mx-auto">
      <div class="mb-10">
        <h1
          class="text-4xl font-extrabold font-headline tracking-tight text-on-surface"
        >
          Meus Amigos
        </h1>
        <p class="text-on-surface-variant mt-2 text-lg">
          Gerencie seu círculo social e convide novas conexões.
        </p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: Friends List -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Lista de Amigos -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h3
                class="text-xl font-bold font-headline flex items-center gap-2"
              >
                Lista de Amigos
                <span
                  class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs"
                  >24</span
                >
              </h3>
              <div class="flex gap-2">
                <button
                  class="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">grid_view</span>
                </button>
                <button
                  class="p-2 rounded-lg bg-surface-container-high text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">view_list</span>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Friend Card 1 -->
              <div
                class="glass-panel p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-4 hover:bg-surface-container-highest transition-all group"
              >
                <div class="relative">
                  <img
                    alt="Friend avatar"
                    class="w-14 h-14 rounded-full bg-surface-container ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all"
                    data-alt="vibrant portrait of a young woman with neon purple highlights in her hair and a stylish urban outfit"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOXp68VKCMnBpcUJI7bvLIOsYpH8bimrkKcLX2FobLA7-FRdICv0GdW4ts5T2YgJfYbwdb3SWft_lIpBp-d3Q0MamUGZD-gxV0cBN7O2D_7PXyuJFByiunKmwEHaxRLB7PMjfbQ1zyTiHiUi-VakQlHD2IU6Hjs7ddoUO_COpEnDijeUrK5wWP5rV93oVyOnV_kubhXZfo9nGHKC31iznew9PPdjom4vJUu7ZZBtSizXFMIFXICXZFNTvBo4dFkAJQnga0zp8uaXm5"
                  />
                  <div
                    class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-surface shadow-sm"
                  ></div>
                </div>
                <div class="flex-grow">
                  <h4 class="font-bold text-on-surface">Maria Oliveira</h4>
                  <p class="text-xs text-on-surface-variant">Online agora</p>
                </div>
                <button
                  class="p-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">chat_bubble</span>
                </button>
              </div>
              <!-- Friend Card 2 -->
              <div
                class="glass-panel p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-4 hover:bg-surface-container-highest transition-all group"
              >
                <div class="relative">
                  <img
                    alt="Friend avatar"
                    class="w-14 h-14 rounded-full bg-surface-container ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all"
                    data-alt="stylized portrait of a young man with glasses and a friendly expression wearing a hoodie"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCij7_7UZc5z8K_IEqTCLBA5uGz9FikBRgHATjY91eEA5wvC3L8T96dgVe4gQVsJP5GjkLQPWr_3Cs_UzwdsmT0xeodoxVjhgAi6Ysb9jXMGNuC_wooMwFD_mFVWi4viCuwdsECBL5JryD0daJK_t58h5gbRUuCVUqKPtqc-Y5ASvdbBGVcm63uVMqK-rvkC7DDCLLqmDqPiEBuSwtBI8bBsMxaXEOe03yJyukNdmyeqYVxu4Ewg_xEF0-jov9XNOepDulgVpRRMOn9"
                  />
                  <div
                    class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-outline border-2 border-surface"
                  ></div>
                </div>
                <div class="flex-grow">
                  <h4 class="font-bold text-on-surface">Lucas Santos</h4>
                  <p class="text-xs text-on-surface-variant">
                    Visto por último: 2h atrás
                  </p>
                </div>
                <button
                  class="p-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">chat_bubble</span>
                </button>
              </div>
              <!-- Friend Card 3 -->
              <div
                class="glass-panel p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-4 hover:bg-surface-container-highest transition-all group"
              >
                <div class="relative">
                  <img
                    alt="Friend avatar"
                    class="w-14 h-14 rounded-full bg-surface-container ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all"
                    data-alt="creative professional portrait of a woman with curly hair and a minimalist artistic background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWOT2SKk69azojX1CU2aEh2eQT8PvnCWPUWv7wVKabRz7oxyLtPCXMzct7XBUwfexJ_n66tfajhMVv5_RHY84tCiimdTiF5W2lLnool27eAHJ-kuRtM12DZ3yYVIqc0VL4uCAUhSvNBZnr5b9gSTScd3Gac2VkHzbKs0ifB__1k_8v4kI8dEFgAT-7uWrYaB-_XXvgETyk_4l7SpgHQQczasXh7KPWqVVGaPFQbRQA-z0F8o2mzAZFDPqB4NiAjUO1nMLO2oeyDNWD"
                  />
                  <div
                    class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-surface shadow-sm"
                  ></div>
                </div>
                <div class="flex-grow">
                  <h4 class="font-bold text-on-surface">Ana Paula</h4>
                  <p class="text-xs text-on-surface-variant">Em uma festa</p>
                </div>
                <button
                  class="p-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">chat_bubble</span>
                </button>
              </div>
              <!-- Friend Card 4 -->
              <div
                class="glass-panel p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-4 hover:bg-surface-container-highest transition-all group"
              >
                <div class="relative">
                  <img
                    alt="Friend avatar"
                    class="w-14 h-14 rounded-full bg-surface-container ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all"
                    data-alt="close-up of a young man with a beard and a warm smile in cinematic moody lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA-LXgIs6Sp9M4dWoHmyORZOnn5i8taPwJ5yA7A07IduYsThO2q2Xu8cq39vOl0xyQm1QmwOIkPLSNSagSBlh5n1sOcKJUJ1cKwcs_mPDPRoi_GXGbZGg-SmoMAd7BwsDKWln8NOXwouPH3URgBufG0u6oInsksjZYAOK0ua_2B9sGdIL5rvu6ohtcNaS9uCi4r4HNJaHkQ3Rsa3lWHc2ri0VYNZzGIc6W_eXGAn2fH__s4PPfp1CrpDDcoE7h_5M_9Rz1b_1bybrp"
                  />
                  <div
                    class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-outline border-2 border-surface"
                  ></div>
                </div>
                <div class="flex-grow">
                  <h4 class="font-bold text-on-surface">Beto Garcia</h4>
                  <p class="text-xs text-on-surface-variant">Offline</p>
                </div>
                <button
                  class="p-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">chat_bubble</span>
                </button>
              </div>
            </div>
            <button
              class="w-full mt-6 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant font-bold hover:bg-surface-container hover:text-on-surface transition-all"
            >
              Ver todos os amigos
            </button>
          </section>
          <!-- Convites Pendentes -->
          <section>
            <h3 class="text-xl font-bold font-headline mb-6">
              Convites Pendentes
            </h3>
            <div class="space-y-4">
              <div
                class="glass-panel p-5 rounded-3xl border border-outline-variant/10 flex flex-wrap items-center justify-between gap-4"
              >
                <div class="flex items-center gap-4">
                  <img
                    alt="Request avatar"
                    class="w-12 h-12 rounded-2xl bg-surface-container"
                    data-alt="portrait of a woman with a trendy haircut in front of a colorful neon glow background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvyB0RTImcDWMwR6wMIPEpNnz1w5NElSqsIOyTZHDkI4XrUR4miKJKJwl6ntB_gxUMBcfVaz_R41p0HaeUThIjr55GQN1G3qcSjh7HxefEja7TYlhPewQyy1FlOJRqJ8xVID0Orv3GIR5W9czPQuD-BYscW1lFyaVc3eXAcQZ0gD8PxYJYH6uG8OaY591U3GHA6aJldw8g39WUcLX0D8_3g7ryC-C4FxPLBnuDA63nT1i2o0Rn7IGMz6ZzD_Fq0KG8b16f7FKZ4xlT"
                  />
                  <div>
                    <h4 class="font-bold text-on-surface leading-none">
                      Carla Mendes
                    </h4>
                    <p class="text-xs text-primary mt-1">
                      Quer ser seu amigo(a)
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-bold shadow-[0_0_15px_rgba(219,144,255,0.3)] hover:scale-105 transition-transform"
                  >
                    Aceitar
                  </button>
                  <button
                    class="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant text-sm font-bold hover:bg-surface-container-highest transition-colors"
                  >
                    Recusar
                  </button>
                </div>
              </div>
              <div
                class="glass-panel p-5 rounded-3xl border border-outline-variant/10 flex flex-wrap items-center justify-between gap-4 opacity-70 grayscale-[0.5]"
              >
                <div class="flex items-center gap-4">
                  <img
                    alt="Outgoing avatar"
                    class="w-12 h-12 rounded-2xl bg-surface-container"
                    data-alt="professional photo of a man in a modern office setting with soft natural light"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIrVa3uCvIzkBfS4jLDi40p5NOPQjUs-xhLPLuTOs8l4ZEpbHLtORyRZxjRww2hn658VoDgOkYAkAO4ZQtF4D2OJCrcO0pcDu6exn2_xOaGbozASs0hLF9yYT9VYb3HMeu3aIftgWBrY773KSk34vT9lKUMv7LIMvnhrbgMy5MXGlbWjTgF5MVAZdwYw5R7sNk2v-6NSUc_IJ8Q1xiPZdONV9j72m8eWeDfbJHMe4-zHCRBaMrKv3KX3O8I7fyn8ZlJQWB0sXijTUv"
                  />
                  <div>
                    <h4 class="font-bold text-on-surface leading-none">
                      Fernando Lima
                    </h4>
                    <p class="text-xs text-on-surface-variant mt-1">
                      Convite enviado há 2 dias
                    </p>
                  </div>
                </div>
                <button
                  class="px-5 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant text-sm font-bold hover:border-error hover:text-error transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </section>
        </div>
        <!-- Right Column: Add Friend & Profile Summary -->
        <div class="lg:col-span-4 space-y-8">
          <!-- Adicionar Novo Amigo -->
          <section
            class="glass-panel p-6 rounded-[2rem] border border-primary/20 glow-accent"
          >
            <div class="mb-6">
              <h3 class="text-xl font-bold font-headline">
                Adicionar Novo Amigo
              </h3>
              <p class="text-sm text-on-surface-variant mt-1">
                Encontre seus contatos na plataforma.
              </p>
            </div>
            <div class="space-y-4">
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-4 flex items-center pointer-events-none"
                >
                  <span class="material-symbols-outlined text-primary"
                    >search</span
                  >
                </div>
                <input
                  class="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-high border-none text-on-surface placeholder-on-surface-variant focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Username ou E-mail"
                  type="text"
                />
              </div>
              <button
                class="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-black tracking-wide uppercase text-sm shadow-[0_8px_30px_rgba(219,144,255,0.2)] active:scale-95 transition-all"
              >
                Enviar Convite
              </button>
            </div>
            <div class="mt-8 pt-8 border-t border-outline-variant/10">
              <p
                class="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4"
              >
                Sugestões para você
              </p>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img
                      alt="Suggestion"
                      class="w-10 h-10 rounded-full bg-surface-container"
                      data-alt="profile of a cheerful young man with a beard and stylish hair"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdv90Z5jfxml44YVCVRh-ptISxeLpfyZPFtIqPuY7WH3_mBwOmM0ActRTWMH3ZDKaNnIKA09ZM6gNWcAzkFuUmkObl9ZYszj84qKrcdgGcAyCJl6QPlvaKGnwTZLLTY3fzc3EWR6h1cWwzvfHIjusasKGph0nn0eIsa5riyEzYo0ZX0ox5lQSWkM8koJwa6AnjvPsv8itACHXPFbHiqW27C3raqopjXy86DG8WgktAcHdAFGnfAJJfuyaKzsVQsJP6DLU3a5_hryTU"
                    />
                    <div>
                      <p class="text-sm font-bold">Vitor Rocha</p>
                      <p class="text-[10px] text-on-surface-variant">
                        Amigo em comum: Maria
                      </p>
                    </div>
                  </div>
                  <button
                    class="text-primary hover:text-on-surface transition-colors"
                  >
                    <span class="material-symbols-outlined">add_circle</span>
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img
                      alt="Suggestion"
                      class="w-10 h-10 rounded-full bg-surface-container"
                      data-alt="vibrant portrait of a woman with a bob haircut and trendy glasses"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb9vm3sFBvfiEh4lW5RgFCLboFPTr3LAVfTf9ZsFowAolH-v0oYGbOfNZk3axxnj28HH4aRKK9ERbJHca9lN-DcpyLOUgtrdBZ4GgcUPLw1Nnh3p2MIclXfLn2uwNAcPZFbWmM9shgnOuLwMfcpWd7w5ecS4qAthCusgWKRtB3RrAbOPENl5p8DahJI-pPkXGJLeG44pdKH9rJHeeHv4GcQla4bTbIo7RhR7yE7fHWX4xlemP2l1QoW70FkZfLCKv_hUHGQPx2tBlI"
                    />
                    <div>
                      <p class="text-sm font-bold">Julia Costa</p>
                      <p class="text-[10px] text-on-surface-variant">
                        Membro da sua cidade
                      </p>
                    </div>
                  </div>
                  <button
                    class="text-primary hover:text-on-surface transition-colors"
                  >
                    <span class="material-symbols-outlined">add_circle</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <!-- Stats Card -->
          <section
            class="bg-surface-container-low rounded-[2rem] p-6 border border-outline-variant/10"
          >
            <h4
              class="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6"
            >
              Seu Impacto
            </h4>
            <div class="grid grid-cols-2 gap-4">
              <div
                class="bg-surface-container-high p-4 rounded-2xl border border-outline-variant/5"
              >
                <p class="text-3xl font-black text-primary">12</p>
                <p
                  class="text-[10px] uppercase font-bold text-on-surface-variant mt-1"
                >
                  Eventos Juntos
                </p>
              </div>
              <div
                class="bg-surface-container-high p-4 rounded-2xl border border-outline-variant/5"
              >
                <p class="text-3xl font-black text-tertiary">05</p>
                <p
                  class="text-[10px] uppercase font-bold text-on-surface-variant mt-1"
                >
                  Novas Conexões
                </p>
              </div>
            </div>
            <div
              class="mt-6 flex items-center justify-center p-4 bg-gradient-to-br from-surface-container-highest to-surface-container-high rounded-2xl"
            >
              <div class="flex -space-x-3">
                <div
                  class="w-8 h-8 rounded-full border-2 border-surface bg-surface-container overflow-hidden"
                >
                  <img
                    alt="Avatar stack"
                    class="w-full h-full object-cover"
                    data-alt="small icon of a human face"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQNV-8GUSzXItm8tP-FKu25piSFDkAI9_I1CzRh8ZPPujVUvjSV98h5z_Z_RhelFGHMoMDSS8sXQWUW1lWHJWu-xxOljl1yr5vz-e_IqLOjltGNKJEZbb9cpvtpDCf3mL6sWHwS59wiwsryOUejnp5SnPj43OwFOMHeKPjtKwAFnmuvuuFkaSCGpUMzQJecGlBfNMAUhUQPL8pvl4dAMjNBAhEwYo68x9r8R2uS3pzeZ1M5GdXrAI-XxXUrbCeJTTgjjNElxREZ_F2"
                  />
                </div>
                <div
                  class="w-8 h-8 rounded-full border-2 border-surface bg-surface-container overflow-hidden"
                >
                  <img
                    alt="Avatar stack"
                    class="w-full h-full object-cover"
                    data-alt="small icon of a human face"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvQSQnbsTgG_03bleBDtKfKgq5ra3lRaw4xNw1LO96-VA3w9Vdy0rZMTjywUP_icx77W2LXZGVNQws0KwF59SPr70h42sQepSiQDkPl5OEs3iSPqbo1qPJiBcOoP2BuY7e0hc9QIq2HL46fcVDTrfrr4rKnkxrJ8Y57-TvEBA4AOxEN5_llczHRRJCEC8QofBPAwMe6U3MVFWmg1IeNLt3W-VhtcvI5At378aDzr7Gqak1_TE_0udEYaK2ctitzUo17585t8xGUAHd"
                  />
                </div>
                <div
                  class="w-8 h-8 rounded-full border-2 border-surface bg-surface-container overflow-hidden"
                >
                  <img
                    alt="Avatar stack"
                    class="w-full h-full object-cover"
                    data-alt="small icon of a human face"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvcqh2MqL8oEScvYunFbfa6vFfcx0X2cnDyJVXcKiDYOKyH508g27oFxuwyWbfY7-ike8D90WuOYPDWy9jae9oHOSkAP2UG5qbGYO6FVxvTgB8W-pXezkHH7A_dX4S-b3a2Zszg5kPzyX5DXKEWRhVyXtF7fPne6gapag5Sp6Cf214pT3cnWtj9V1CsFIcm6-aoLFSxcCyCAMDsthywTzQV3LJRk3jDMNxX_Kovp02Bq8s87Fnh--O0qQxCYRmBBV_ihZic7uyUKYs"
                  />
                </div>
                <div
                  class="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold"
                >
                  +21
                </div>
              </div>
              <span class="ml-4 text-xs font-medium text-on-surface-variant"
                >Seus amigos estão ativos!</span
              >
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
.glass-panel {
  background: rgba(38, 38, 38, 0.6);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
}
.glow-accent {
  box-shadow: 0 0 40px rgba(219, 144, 255, 0.1);
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0e0e0e;
}
::-webkit-scrollbar-thumb {
  background: #262626;
  border-radius: 10px;
}
</style>