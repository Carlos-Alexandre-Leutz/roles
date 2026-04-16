<template>
  <div class="body bg-surface text-on-surface font-body overflow-x-hidden">
      <!-- Top Navigation -->
      <nav class="fixed top-0 w-full z-50 bg-zinc-950/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(219,144,255,0.1)]">
          <div class="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
              <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-purple-400 text-3xl" data-icon="groups">groups</span>
                  <span class="text-2xl font-extrabold tracking-tighter text-white uppercase font-headline">ROLES</span>
              </div>
              <div class="hidden md:flex items-center gap-8">
                  <a class="text-purple-400 border-b-2 border-purple-400 pb-1 font-['Plus_Jakarta_Sans'] tracking-tighter antialiased"
                      href="#">Explore</a>
                  <a class="text-zinc-400 hover:text-white transition-all font-['Plus_Jakarta_Sans'] tracking-tighter antialiased"
                      href="#">Segurança</a>
                  <a class="text-zinc-400 hover:text-white transition-all font-['Plus_Jakarta_Sans'] tracking-tighter antialiased"
                      href="#">Manifesto</a>
              </div>
              <RouterLink to="/login">
                <button
                    class="bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold px-8 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer">
                    Join Now
                </button>
              </RouterLink>
          </div>
      </nav>
      <main class="relative pt-20">
          <!-- Decorative Ambient Glows -->
          <div class="absolute top-20 -left-20 w-96 h-96 atmospheric-glow rounded-full"></div>
          <div class="absolute top-1/2 -right-20 w-80 h-80 atmospheric-glow rounded-full"></div>
          <!-- Section 1: Hero -->
          <section class="hero-gradient min-h-[795px] flex items-center justify-center relative overflow-hidden px-6">
              <div class="max-w-7xl mx-auto text-center z-10">
                  <h1
                      class="font-headline text-5xl md:text-8xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                      Transforme seus <span class="text-primary">rolês</span> em <br class="hidden md:block" /> memórias
                  </h1>
                  <p class="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12">
                      Organize passeios com amigos, divida gastos e nunca mais perca aquele lugar especial.
                  </p>
                  <div class="flex flex-col md:flex-row gap-6 justify-center items-center">
                      <RouterLink to="/login">
                        <button
                          class="bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold px-10 py-5 rounded-full text-lg shadow-[0_0_40px_rgba(219,144,255,0.3)] hover:shadow-[0_0_60px_rgba(219,144,255,0.5)] transition-all transform hover:-translate-y-1">
                          Começar Agora
                        </button>
                      </RouterLink>
                  </div>
                  <!-- Featured Image / App Visual -->
                  <div class="mt-20 relative w-full max-w-5xl mx-auto">
                      <div
                          class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10 h-[110%]">
                      </div>
                      <img class="w-full h-[500px] object-cover rounded-t-[3rem] opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 border-x border-t border-outline-variant/20 shadow-2xl"
                          data-alt="Cinematic dark shot of a stylish group of friends laughing at a modern dimly lit urban cocktail lounge with neon purple lighting"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTeEM-Jejg7xTNRpswgF4xtBZk0yprIj9ID_mGiXz7c86cA6kGq52EpE4AIQ9sF0eSLqU64IfFQwHg_wRvVVPgizyyne_9vjSyKcG-d3XJbZ24ezD02CETNwPursqB9WGEUVu1l3prrJ5YjYEGbiDblNBZZyy2JeB2x6lDQSligdYmL7EW7ll1BETDcS7gFzWzvymugG4UnT38YDdM5aFZvNar8u0SV4bLbzF_U4ArIN_fM6lzxe3oRIdUxrpGG1XLI51Z0rSsvA42" />
                  </div>
              </div>
          </section>
          <!-- Section 2: Features (Bento Grid Style) -->
          <section class="py-24 px-6 relative max-w-7xl mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <!-- Large Feature Card -->
                  <div
                      class="md:col-span-2 bg-surface-container-low rounded-[2rem] p-10 flex flex-col justify-between min-h-[400px] border border-outline-variant/5 group overflow-hidden relative">
                      <div class="z-10">
                          <div class="bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                              <span class="material-symbols-outlined text-primary text-3xl"
                                  data-icon="groups">groups</span>
                          </div>
                          <h3 class="font-headline text-4xl font-bold text-white mb-4">Planejamento em Grupo</h3>
                          <p class="text-on-surface-variant text-lg max-w-md">
                              Adicione amigos em segundos e colabore em tempo real. Votos, chats e itinerários
                              sincronizados para ninguém ficar de fora.
                          </p>
                      </div>
                      <div
                          class="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700 opacity-30">
                          <img class="w-[400px] h-[400px] object-cover rounded-full"
                              data-alt="Close up of multiple hands reaching for glowing colorful smart phone screens in a dark social setting"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATtks0xRvrr1F_CuYdvVS9exhToS6n4cUsUC58gtZEGg1aG3BsfWFloDcj40XeUvtU1oqJWxrxnEkWdgHjLkMwW9Eq45fhNkrWbcwc46-D77TvlNiCQevEpGAjgTFG056oGJythIdTMODJ0PCofjgGK7k0pAKdC7mCx7nIxZg9eWqMQ2YzZoB69BNbm7IV6j2XFJ1f4zlY1OsqHbQY7phkgewZFw8qurVBFHrJRuoAeKkKokXwO2kD7O_s3jDyxTcejqotyEP3xkwS" />
                      </div>
                  </div>
                  <!-- Secondary Feature 1 -->
                  <div
                      class="bg-surface-container-high rounded-[2rem] p-10 flex flex-col justify-start border border-outline-variant/5">
                      <div class="bg-primary-container/20 w-12 h-12 rounded-xl flex items-center justify-center mb-8">
                          <span class="material-symbols-outlined text-primary-container text-2xl"
                              data-icon="payments">payments</span>
                      </div>
                      <h3 class="font-headline text-2xl font-bold text-white mb-3">Controle de Gastos</h3>
                      <p class="text-on-surface-variant">
                          Divida a conta sem drama. Saiba exatamente quanto cada um deve e facilite o acerto de contas
                          instantaneamente.
                      </p>
                  </div>
                  <!-- Secondary Feature 2 -->
                  <div
                      class="bg-surface-container-high rounded-[2rem] p-10 flex flex-col justify-start border border-outline-variant/5">
                      <div class="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-8">
                          <span class="material-symbols-outlined text-primary text-2xl"
                              data-icon="bookmark_heart">bookmark_heart</span>
                      </div>
                      <h3 class="font-headline text-2xl font-bold text-white mb-3">Lista de Desejos</h3>
                      <p class="text-on-surface-variant">
                          Viu um lugar legal? Salve-o na sua Wishlist. Nunca mais esqueça aquele restaurante ou bar que
                          você sempre quis ir.
                      </p>
                  </div>
                  <!-- Tertiary High-End Feature -->
                  <div
                      class="md:col-span-2 glass-panel rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-10 border border-outline-variant/10">
                      <div class="flex-1">
                          <h3 class="font-headline text-3xl font-bold text-white mb-4">Sincronização Atemporal</h3>
                          <p class="text-on-surface-variant">
                              Seus planos estão sempre acessíveis, online ou offline. O ROLES mantém seus dados seguros na
                              nuvem para qualquer momento.
                          </p>
                      </div>
                      <div class="flex-shrink-0 flex -space-x-4">
                          <div
                              class="w-16 h-16 rounded-full border-2 border-surface bg-zinc-800 flex items-center justify-center overflow-hidden">
                              <img class="w-full h-full object-cover" data-alt="portrait of man"
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhrgrT7Ubhwn8luIpEO9hNjw2j_MSYjSHDIt7heDOFIlut4irMaRIUL_yt1qlX1tShCRwLWvNwztfQXyoJHGu8dVhilZifckij7hU2ImNdwq18P2Tt3VUPQvEUpdfwhe78OJIzxcRmPtmb9_Pq05S5-h84fk75eV9Ss5-GZUusu8Z5T2kxNHUPO1-kz0QTU_ILa4LL2RimM-yPxVql3h8UC-L-yYRaRYQOgWJ3N2NoARvahJrkMTMJy9A5WpWm-C0VGNSiuWrQiM-r" />
                          </div>
                          <div
                              class="w-16 h-16 rounded-full border-2 border-surface bg-zinc-800 flex items-center justify-center overflow-hidden">
                              <img class="w-full h-full object-cover" data-alt="portrait of woman"
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtKLLO4su3axyi3zWhinzLyzYO63UMZusnRI8g6wF9Hha0wlcC2cfiDvtzJnzeflHsiC-m5DrdIJqJMsafLM6SD3MkPBt0u5tMZiFcfSc7KdH9C781REhHON7zv-2Jr2AYVpLFY6Tc1TDbU16ijECSYfHypzrQKiyMTsC3KRl3_9opmASVlV-JVGQdtMsuQBoTu2d_syoOkcTTAtsicdk3knSmxdxe9G_4dBl_l5dhXQcImA7cogQU7APiRH0y8nEzt24mao2oI6ae" />
                          </div>
                          <div
                              class="w-16 h-16 rounded-full border-2 border-surface bg-primary flex items-center justify-center text-on-primary-container font-bold">
                              +12
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <!-- Section 3: Social Proof -->
          <section class="py-32 px-6 bg-surface-container-low/50">
              <div class="max-w-7xl mx-auto text-center">
                  <span class="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">COMUNIDADE</span>
                  <h2
                      class="font-headline text-4xl md:text-6xl font-bold text-white mb-12 max-w-4xl mx-auto leading-tight italic">
                      "Feito para quem não quer perder tempo organizando e sim curtindo"
                  </h2>
                  <div class="flex flex-wrap justify-center gap-12 opacity-50 grayscale contrast-125">
                      <div class="flex items-center gap-2">
                          <span class="material-symbols-outlined text-3xl" data-icon="restaurant">restaurant</span>
                          <span class="font-bold text-xl">GASTRO_APP</span>
                      </div>
                      <div class="flex items-center gap-2">
                          <span class="material-symbols-outlined text-3xl" data-icon="nightlife">nightlife</span>
                          <span class="font-bold text-xl">CLUB_VIBE</span>
                      </div>
                      <div class="flex items-center gap-2">
                          <span class="material-symbols-outlined text-3xl" data-icon="map">map</span>
                          <span class="font-bold text-xl">MAP_GUIDE</span>
                      </div>
                      <div class="flex items-center gap-2">
                          <span class="material-symbols-outlined text-3xl" data-icon="celebration">celebration</span>
                          <span class="font-bold text-xl">FESTIVAL_CO</span>
                      </div>
                  </div>
              </div>
          </section>
          <!-- Section 4: Final CTA -->
          <section class="py-32 px-6 relative overflow-hidden">
              <div class="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-right"></div>
              <div
                  class="max-w-5xl mx-auto glass-panel rounded-[3rem] p-16 text-center relative z-10 border border-primary/20 shadow-[0_0_80px_rgba(219,144,255,0.15)]">
                  <h2 class="font-headline text-4xl md:text-6xl font-bold text-white mb-6">Pronto para o próximo rolê?
                  </h2>
                  <p class="text-on-surface-variant text-xl md:text-2xl mb-12">
                      O ROLES é 100% gratuito. Crie sua conta hoje.
                  </p>
                  <div class="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                          class="bg-white text-black font-extrabold px-12 py-5 rounded-full text-xl hover:bg-primary-container transition-all flex items-center justify-center gap-3">
                          Criar Conta Grátis
                          <span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                      </button>
                  </div>
              </div>
          </section>
      </main>
      <!-- Footer -->
      <footer class="bg-zinc-950 w-full py-12 border-t border-zinc-800/50">
          <div
              class="flex flex-col md:flex-row justify-between items-center gap-8 px-8 max-w-7xl mx-auto font-['Manrope'] text-sm tracking-wide">
              <div class="flex flex-col items-center md:items-start gap-4">
                  <div class="text-lg font-bold text-white font-headline">ROLES</div>
                  <p class="text-zinc-500">© 2024 ROLES. Elevate your outings.</p>
              </div>
              <div class="flex gap-10">
                  <a class="text-zinc-500 hover:text-zinc-200 transition-colors duration-200 hover:text-purple-300 underline-offset-4 hover:underline"
                      href="#">Manifesto</a>
                  <a class="text-zinc-500 hover:text-zinc-200 transition-colors duration-200 hover:text-purple-300 underline-offset-4 hover:underline"
                      href="#">Safety</a>
                  <a class="text-zinc-500 hover:text-zinc-200 transition-colors duration-200 hover:text-purple-300 underline-offset-4 hover:underline"
                      href="#">Privacy</a>
                  <a class="text-purple-400 font-bold transition-colors duration-200 hover:text-purple-300 underline-offset-4 hover:underline"
                      href="#">Explore</a>
              </div>
              <div class="flex gap-6">
                  <a class="text-zinc-500 hover:text-white transition-all" href="#">
                      <span class="material-symbols-outlined" data-icon="language">language</span>
                  </a>
                  <a class="text-zinc-500 hover:text-white transition-all" href="#">
                      <span class="material-symbols-outlined" data-icon="share">share</span>
                  </a>
              </div>
          </div>
      </footer>
  </div>
</template>
<style>
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }

    .glass-panel {
        background: rgba(38, 38, 38, 0.6);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
    }

    .atmospheric-glow {
        filter: blur(64px);
        background: #db90ff;
        opacity: 0.15;
    }

    .hero-gradient {
        background: linear-gradient(180deg, rgba(219, 144, 255, 0.08) 0%, rgba(14, 14, 14, 0) 100%);
    }
    .body {
        min-height: max(884px, 100dvh);
    }
</style>
