<template>
  <div class="font-body selection:bg-primary/30">
    <!-- Main Content Canvas -->
    <main class="lg:pl-64 pt-20 min-h-screen bg-surface">
      <div class="max-w-[1400px] mx-auto p-8 lg:p-12">
        <!-- Hero Section -->
        <section class="mb-12 relative rounded-[2.5rem] overflow-hidden group">
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10"
          ></div>
          <div class="h-80 w-full overflow-hidden">
            <img
              alt="Brazilian BBQ"
              class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              data-alt="juicy pieces of seasoned meat grilling on a charcoal barbecue with glowing embers and soft smoke in a festive night setting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMRLsKkzsGozROokdpNZHaMm7GqcTuJuP7I4K28djalwuNaHJhvWZhLYMQoTLTZ0tdeGX_WerTJWBpOq-3Sm8qczUg48wUnzLxL-UPAuAu-jjiq0oakhurWNniQvefDa6N618wyMFwZ5wFzPe4XyAu9BP_FuXgskZ7vPO1K118fA2C49d-4OCNhiLeScIMMjv0UjYhwkv2U28CJ-HzbS9cPBulAwFRG-QisAAFCGlwyeCgODbLz1AMHUudL_HOP61ICGK2IqgvEdV0"
            />
          </div>
          <div
            class="absolute bottom-0 left-0 p-10 z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="bg-primary/20 backdrop-blur-md text-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-primary/20"
                  >Confirmado</span
                >
                <span
                  class="text-on-surface-variant text-sm flex items-center gap-2"
                >
                  <span class="material-symbols-outlined text-base"
                    >calendar_today</span
                  >
                  15 OUT, 2023 • 14:00
                </span>
              </div>
              <h2
                class="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-white mb-2"
              >
                Churrasco no Prédio
              </h2>
              <div class="flex items-center gap-2 text-on-surface-variant">
                <span class="material-symbols-outlined text-primary"
                  >location_on</span
                >
                <span class="text-lg">Rua das Flores, 123 - São Paulo, SP</span>
              </div>
            </div>
            <div class="flex gap-4">
              <button
                class="flex items-center gap-2 px-8 py-4 bg-surface-container-highest/60 backdrop-blur-xl rounded-full font-bold border border-outline-variant/20 hover:bg-surface-container-highest transition-all"
              >
                <span class="material-symbols-outlined">share</span>
                Convidar
              </button>
              <button
                class="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
              >
                <span class="material-symbols-outlined">edit</span>
                Editar Evento
              </button>
            </div>
          </div>
        </section>
        <!-- Bento Grid Content -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left Column: Guests and Tasks -->
          <div class="lg:col-span-8 space-y-8">
            <!-- Guest List Bento Card -->
            <div
              class="glass-panel p-8 rounded-[2rem] border border-outline-variant/10"
            >
              <div class="flex justify-between items-center mb-8">
                <div>
                  <h3 class="text-2xl font-headline font-bold text-white">
                    Lista de Convidados
                  </h3>
                  <p class="text-on-surface-variant text-sm mt-1">
                    24 pessoas confirmadas até agora
                  </p>
                </div>
                <button class="text-primary font-bold text-sm hover:underline">
                  Ver Todos
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Guest Item -->
                <div
                  class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl group hover:bg-surface-container transition-colors"
                >
                  <div class="flex items-center gap-4">
                    <img
                      alt="Avatar"
                      class="w-12 h-12 rounded-full"
                      data-alt="portrait of a young man with glasses and short dark hair with soft dramatic studio lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB_VocC9KZJO7uBs7oxklWG9-xpNSmq8x4uy0Sxc6kdWSPzpWeZWV-dF7SqFVAq3zuym6KAtaVBXxMT_ZpvAVLw7is60ZGthurNMtsLu9mphewtEgrgcF42gg3DzCtjzUfAGPeEK8wDwJtj8pmqbPMGmuw44CDDcE-NrPP7-QaLvuyb8PTOBK9xTXjS5_eMm94Pz6DxJ68VUxdDi03UtljPdgLSol7PaNKiK6rHuc8TNfEggFJAdhGhcCM12FaNqsBJjxMLQz0DnG0"
                    />
                    <div>
                      <p class="font-bold text-white">Ricardo Mendes</p>
                      <p class="text-xs text-on-surface-variant">@ricardo_m</p>
                    </div>
                  </div>
                  <span
                    class="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-tighter"
                    >Confirmado</span
                  >
                </div>
                <div
                  class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl group hover:bg-surface-container transition-colors"
                >
                  <div class="flex items-center gap-4">
                    <img
                      alt="Avatar"
                      class="w-12 h-12 rounded-full"
                      data-alt="portrait of a young woman with a joyful expression and soft natural lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX4bhBZ0dT6UEI3_q9rn8Glhrf9Ns-4XS8Hxx1zytQpRaRu7dOtJHTLTYTjLAsyWYwKq0blnq8KbX6j-VVfbQFVtfq_gEfrnKa-lTiIbzSAuSHLHey097xWKN7a4wpZiKMVjpKXf9TyANgZCGUb6qw1YvkkF9ZPmC-woSZBCca_KhhsNjLBQAhVcW02osFsmXCJPjjjiUNtMLEmw3APvRA32UEvlOPitQBm7CZH_ZhBoDVh6b80EXzEqO3_pjZXxxV0mN5j3maw_7m"
                    />
                    <div>
                      <p class="font-bold text-white">Ana Paula</p>
                      <p class="text-xs text-on-surface-variant">@anap</p>
                    </div>
                  </div>
                  <span
                    class="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full uppercase tracking-tighter"
                    >Pendente</span
                  >
                </div>
                <div
                  class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl group hover:bg-surface-container transition-colors"
                >
                  <div class="flex items-center gap-4">
                    <img
                      alt="Avatar"
                      class="w-12 h-12 rounded-full"
                      data-alt="smiling man in casual clothing with cinematic lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp2jwK6eMrbGpNFwR_kcKFWNUImglDCWYZtkrTDkMvFhNUNzymC2Mby_e1GDelhczWtZg6t3Wh7Ad5hNh0l71IfIlHNbgVLCqSIknMq7uysBIm_pdn0FBtwvdqjxrUBK16CRXTegoMJ2Kl22CV19Ipe27uUICIBSiVCBiHWEy0EqtH9rtcjpbL8P4BAaY59DdB7VwU8xQVwPhGJ7smLJRL8GflXP7eBxWTeo_UCZI_4_Bc0uXL1MBuPux1x9rL_a_BSEH1wFiPb_yd"
                    />
                    <div>
                      <p class="font-bold text-white">Marcos Silva</p>
                      <p class="text-xs text-on-surface-variant">@msilva</p>
                    </div>
                  </div>
                  <span
                    class="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-tighter"
                    >Confirmado</span
                  >
                </div>
                <div
                  class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl group hover:bg-surface-container transition-colors"
                >
                  <div class="flex items-center gap-4">
                    <img
                      alt="Avatar"
                      class="w-12 h-12 rounded-full"
                      data-alt="woman with thoughtful gaze in soft moody ambient lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD79t0iWRCoxa44WUmBeJeAPLd5M4zV17wZMb4ArG6sZy30yV4hDQLznweI2Qsxjuu94kbfKbezyphFtfczkFI6C7WHLrIoCcmJmNM2-VZ5PRrTX4i1eoCXmWEd9tbW3soLqdHYJy1fzDC0Rnb9SAZOaJfeJ-PhSHI3WA6bGK8kmB6srT90ChlJIHGDpV6iwmbl2PYLNpXzaMAg1kWnMrUCTRzHW7GEFe9i908-RQyZoOoV71-lbUHMBQYn80UyyaySUWoFUQrjrZgf"
                    />
                    <div>
                      <p class="font-bold text-white">Carla Dias</p>
                      <p class="text-xs text-on-surface-variant">@carlita</p>
                    </div>
                  </div>
                  <span
                    class="text-[10px] font-bold text-error bg-error/10 px-3 py-1 rounded-full uppercase tracking-tighter"
                    >Recusado</span
                  >
                </div>
              </div>
            </div>
            <!-- Checklist / Expenses Bento Card -->
            <div
              class="glass-panel p-8 rounded-[2rem] border border-outline-variant/10 relative overflow-hidden"
            >
              <div
                class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10"
              ></div>
              <div class="flex justify-between items-center mb-8">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center"
                  >
                    <span class="material-symbols-outlined text-primary"
                      >shopping_cart</span
                    >
                  </div>
                  <h3 class="text-2xl font-headline font-bold text-white">
                    Checklist &amp; Despesas
                  </h3>
                </div>
                <button
                  class="bg-surface-container-highest px-6 py-2 rounded-full text-sm font-bold border border-outline-variant/20 hover:text-primary transition-colors"
                >
                  + Adicionar Item
                </button>
              </div>
              <div class="space-y-3">
                <!-- Task Item -->
                <div
                  class="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl border-l-4 border-primary/40"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-6 h-6 rounded-md border-2 border-primary flex items-center justify-center cursor-pointer bg-primary/10"
                    >
                      <span
                        class="material-symbols-outlined text-xs text-primary"
                        style="font-variation-settings: 'FILL' 1"
                        >check</span
                      >
                    </div>
                    <div>
                      <p class="text-white font-bold">
                        Comprar Carne (Picanha/Alcatra)
                      </p>
                      <p class="text-xs text-on-surface-variant">
                        Responsável:
                        <span class="text-primary font-semibold"
                          >Ricardo Mendes</span
                        >
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-bold">R$ 450,00</p>
                    <span
                      class="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-widest"
                      >Pago</span
                    >
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-6 h-6 rounded-md border-2 border-outline flex items-center justify-center cursor-pointer"
                    ></div>
                    <div>
                      <p class="text-white font-bold">
                        Trazer Carvão e Sal Grosso
                      </p>
                      <p class="text-xs text-on-surface-variant">
                        Pendente: <span class="text-on-surface">Você</span>
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-on-surface-variant font-bold">R$ 45,00</p>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-6 h-6 rounded-md border-2 border-outline flex items-center justify-center cursor-pointer"
                    ></div>
                    <div>
                      <p class="text-white font-bold">
                        Bebidas (Cerveja/Refrigerante)
                      </p>
                      <p class="text-xs text-on-surface-variant">
                        Responsável:
                        <span class="text-primary font-semibold"
                          >Ana Paula</span
                        >
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-white font-bold">R$ 280,00</p>
                  </div>
                </div>
              </div>
              <div
                class="mt-8 p-6 bg-primary/10 rounded-3xl flex justify-between items-center border border-primary/10"
              >
                <div>
                  <p
                    class="text-primary-fixed text-sm font-bold uppercase tracking-widest"
                  >
                    Total Estimado
                  </p>
                  <p class="text-3xl font-headline font-black text-white">
                    R$ 775,00
                  </p>
                </div>
                <button
                  class="bg-primary text-on-primary-container px-8 py-3 rounded-full font-bold"
                >
                  Dividir Conta
                </button>
              </div>
            </div>
          </div>
          <!-- Right Column: Chat -->
          <div class="lg:col-span-4 h-full sticky top-28">
            <div
              class="glass-panel flex flex-col h-[calc(100vh-10rem)] rounded-[2rem] border border-outline-variant/10 overflow-hidden"
            >
              <div
                class="p-6 border-b border-outline-variant/10 bg-[#201f1f]/50"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"
                  ></div>
                  <h3 class="text-xl font-headline font-bold text-white">
                    Chat do Evento
                  </h3>
                </div>
                <p class="text-xs text-on-surface-variant mt-1">
                  Coordenação e Zoeira
                </p>
              </div>
              <!-- Messages Area -->
              <div class="flex-1 overflow-y-auto p-6 space-y-6">
                <!-- Message Recv -->
                <div class="flex gap-3">
                  <img
                    alt="Avatar"
                    class="w-8 h-8 rounded-full self-end"
                    data-alt="small circular avatar of a man with glasses"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfaPimx7ofW23VEbOK2nb4Cu5fkDy1AlAHNeFeXmPR0rHVHfPKk_ad88tTyUhQ51CaZ5E9OYs9YrsV5RoKwcuutohr6b-9SjRWjUplZdlv1XXOtOa4Z22Q9PdpoZZXHvvDLyxpS9pYk2VdsgTXWMucE8Az_Ebu6v8YcX58MdE6boErrGzUeIl_r558rnNtDj4zS9A20B-giVAB6PW0sbQpmXs3Uab7IFXPQNlOt_URHKumm4znq1FCKEwoENbh1B17X9OdsL5pN1Hg"
                  />
                  <div class="max-w-[80%]">
                    <p class="text-[10px] text-on-surface-variant mb-1 ml-2">
                      Ricardo • 10:45
                    </p>
                    <div
                      class="bg-surface-container-high p-4 rounded-2xl rounded-bl-none text-sm text-on-secondary-container"
                    >
                      Galera, já peguei as carnes lá no açougue. Estão tops! 🥩
                    </div>
                  </div>
                </div>
                <!-- Message Sent -->
                <div class="flex flex-row-reverse gap-3">
                  <div class="max-w-[80%]">
                    <p
                      class="text-[10px] text-on-surface-variant mb-1 mr-2 text-right"
                    >
                      Você • 10:47
                    </p>
                    <div
                      class="bg-primary/20 p-4 rounded-2xl rounded-br-none text-sm text-white border border-primary/20"
                    >
                      Boa! Vou levar o carvão e o gelo quando sair daqui.
                    </div>
                  </div>
                </div>
                <!-- Message Recv -->
                <div class="flex gap-3">
                  <img
                    alt="Avatar"
                    class="w-8 h-8 rounded-full self-end"
                    data-alt="small circular avatar of a woman smiling"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbHnDb0ILPzOWasyYWh5S7Gf4RQLkQX4RF_ar50R6DjU0581DDWFs-axVPxbuSVJlrGMu6PBQUMdyQ-gg-IAHecJp2yg14qeAV3WjTYWW3G3uX324VjhYTxExrUIUHzeklqKY0oUQmi7MKm2lhUvHMtg3i5PQeC47aZehMO7z_LJX63EQRGn8vwhyoY4dKcDPXq8PxqWRRPdVImFq-xGxus9rZolTt61ItSRFLdvTJzPuHfn8lzngoTTdj71dBjzJ0kfTtr13m4Mqh"
                  />
                  <div class="max-w-[80%]">
                    <p class="text-[10px] text-on-surface-variant mb-1 ml-2">
                      Ana Paula • 10:50
                    </p>
                    <div
                      class="bg-surface-container-high p-4 rounded-2xl rounded-bl-none text-sm text-on-secondary-container"
                    >
                      Não esqueçam de levar os coolers, o freezer do salão tá
                      meio ruim.
                    </div>
                  </div>
                </div>
              </div>
              <!-- Chat Input -->
              <div class="p-6 bg-surface-container">
                <div class="relative flex items-center">
                  <input
                    class="w-full bg-surface-container-highest border-none rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
                    placeholder="Escreva uma mensagem..."
                    type="text"
                  />
                  <button
                    class="absolute right-3 w-10 h-10 bg-primary text-on-primary-container rounded-xl flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <span class="material-symbols-outlined text-sm">send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- Bottom Navigation for Mobile -->
    <nav
      class="md:hidden fixed bottom-0 left-0 right-0 bg-[#0e0e0e]/95 backdrop-blur-2xl border-t border-outline-variant/10 flex justify-around items-center h-20 px-4 z-50"
    >
      <a class="flex flex-col items-center gap-1 text-primary" href="#">
        <span
          class="material-symbols-outlined"
          style="font-variation-settings: 'FILL' 1"
          >event</span
        >
        <span class="text-[10px] font-bold uppercase tracking-widest"
          >Evento</span
        >
      </a>
      <a class="flex flex-col items-center gap-1 text-[#adaaaa]" href="#">
        <span class="material-symbols-outlined">group</span>
        <span class="text-[10px] font-bold uppercase tracking-widest"
          >Pessoas</span
        >
      </a>
      <a class="flex flex-col items-center gap-1 text-[#adaaaa]" href="#">
        <span class="material-symbols-outlined">checklist</span>
        <span class="text-[10px] font-bold uppercase tracking-widest"
          >Tasks</span
        >
      </a>
      <a class="flex flex-col items-center gap-1 text-[#adaaaa]" href="#">
        <span class="material-symbols-outlined">forum</span>
        <span class="text-[10px] font-bold uppercase tracking-widest"
          >Chat</span
        >
      </a>
    </nav>
  </div>
</template>

<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
.glass-panel {
  background: rgba(32, 31, 31, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
.tonal-transition {
  background: linear-gradient(180deg, #0e0e0e 0%, #131313 100%);
}
</style>
