<template>
  <div
    class="glass-panel flex flex-col h-[calc(100vh-10rem)] rounded-[2rem] border border-outline-variant/10 overflow-hidden"
  >
    <div class="p-6 border-b border-outline-variant/10 bg-[#201f1f]/50">
      <div class="flex items-center gap-3">
        <div class="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        <h3 class="text-xl font-headline font-bold text-white">
          Chat do Evento
        </h3>
      </div>
      <p class="text-xs text-on-surface-variant mt-1">Coordenação e Zoeira</p>
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
          <p class="text-[10px] text-on-surface-variant mb-1 mr-2 text-right">
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
            Não esqueçam de levar os coolers, o freezer do salão tá meio ruim.
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
</template>