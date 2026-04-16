<template>
  <section class="mt-20 p-12 max-w-7xl mx-auto">
    <div class="flex justify-between items-end mb-12">
      <div>
        <h2
          class="text-5xl font-black font-headline text-on-surface tracking-tighter mb-2"
        >
          Meus Rolês
        </h2>
        <p class="text-on-surface-variant text-lg">
          Gerencie seus próximos eventos e encontros.
        </p>
      </div>
      <div class="flex gap-4">
        <div
          class="flex items-center bg-surface-container-low px-4 py-2 rounded-xl gap-3"
        >
          <span class="material-symbols-outlined text-primary text-sm"
            >filter_list</span
          >
          <span class="text-sm font-medium text-on-surface-variant"
            >Filtrar</span
          >
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        class="group relative bg-surface-container-low rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 atmospheric-glow"
      >
        <div class="h-48 overflow-hidden relative">
          <img
            alt="Churrasco no Prédio"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            data-alt="overhead view of a vibrant rooftop barbecue party at dusk with strings of warm fairy lights and smoke rising"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo4qBJ1nLGH8YjJ-Hka5EDoITmH0zthmtxl2CKOzR6-HH9bjU46sOmetBcgAgqXX3FISzRw6bXZP54sEDhbM3cWNvPkTeOrQ4_odjQe1JuVZYkL4oO7dHSQ-faUaH60_VC7Y5ZWfs3BlhSuL6PxBJPodXGepJigHjkwX4pCVJtm3vy6PGKnVh4V1NfzQKJ0UK_If40G86SBVRfaxZ-bElApeDitV09G3rQ9V9xYlO_kP1ETsyRCMDRGqYXhcQ-PCJCtxsbjkZWJQCf"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"
          ></div>
          <div
            class="absolute top-4 right-4 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30"
          >
            <span
              class="text-[10px] font-bold text-primary uppercase tracking-wider"
              >Confirmado</span
            >
          </div>
        </div>
        <div class="p-8">
          <div class="flex items-center gap-2 text-primary mb-3">
            <span class="material-symbols-outlined text-sm"
              >calendar_today</span
            >
            <span class="text-xs font-bold uppercase tracking-widest"
              >15 Out, 2023 • 14:00</span
            >
          </div>
          <h3
            class="text-2xl font-bold font-headline text-on-surface mb-6 leading-tight"
          >
            Churrasco no Prédio
          </h3>
          <div class="flex gap-3">
            <button
              class="flex-1 py-3 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95 transition-transform"
            >
              Ver Detalhes
            </button>
            <button
              class="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors active:scale-95 transition-transform"
            >
              <span class="material-symbols-outlined">edit</span>
            </button>
          </div>
        </div>
      </div>
      <div
        class="group relative bg-surface-container-low rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 atmospheric-glow"
      >
        <div class="h-48 overflow-hidden relative">
          <img
            alt="Noite de Poker"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            data-alt="cinematic close up of poker chips and cards on a green felt table with dramatic moody lighting and soft bokeh"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiJXoTRBSutFqE7YeadGuu7hl9bzYaN1Dsia1hOozFe5SU5H71eJaIJhXG8hqMPa0owvcZMVvAC2Rg5Lpwj3Zdw8GxMm_Rm2wx9xpocy-AzpfshzQW2XbCuMd7tyigra-3LzU7sOy5Be73ljOjzFqq1gghSFMCVgFSTrD_YFJU9rXRG8pguleCVWL6XFvBS05D_Ocvq8kRzFD4EBR_LefWctSnrw4aGpy8IUjth6xhGd2wvepF9dbzERUATB-Ky2CWVs-5vWHR-IK6"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"
          ></div>
          <div
            class="absolute top-4 right-4 bg-surface-container-highest/60 backdrop-blur-md px-3 py-1 rounded-full border border-outline-variant/30"
          >
            <span
              class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider"
              >Pendente</span
            >
          </div>
        </div>
        <div class="p-8">
          <div class="flex items-center gap-2 text-primary mb-3">
            <span class="material-symbols-outlined text-sm"
              >calendar_today</span
            >
            <span class="text-xs font-bold uppercase tracking-widest"
              >22 Out, 2023 • 20:00</span
            >
          </div>
          <h3
            class="text-2xl font-bold font-headline text-on-surface mb-6 leading-tight"
          >
            Noite de Poker
          </h3>
          <div class="flex gap-3">
            <button
              class="flex-1 py-3 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95 transition-transform"
            >
              Ver Detalhes
            </button>
            <button
              class="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors active:scale-95 transition-transform"
            >
              <span class="material-symbols-outlined">edit</span>
            </button>
          </div>
        </div>
      </div>
      <div
        class="group relative bg-surface-container-low rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 atmospheric-glow"
      >
        <div class="h-48 overflow-hidden relative">
          <img
            alt="Ida ao Cinema"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            data-alt="interior of a modern luxury cinema with red velvet seats and ambient blue lighting on the walls"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEHfNe5aTPYob6EzHA3o_RaZjPjItdYTOI8iUW_mp9xWYfHD-cD9UTZxJ8-Ymk8CFcM8jkcGo03Nr0-c-QeSw_dcFWN6lK0uhgOPO_YUhR3PAyZv-8nFgZJ09ogRCliETFfVk59TggViQs5FgtkOMVvKdkum7UgEKFj5539EoTRgqvt_acVTiUHTLaiquCDI3FUcYuXOSRrKUet738QBo2Q0_BbYoMdiTtt8hjIZp3apcZWJbZUZp2QNo3SxNQWKbFzu_9RrqVa7mr"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"
          ></div>
          <div
            class="absolute top-4 right-4 bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30"
          >
            <span
              class="text-[10px] font-bold text-primary uppercase tracking-wider"
              >Confirmado</span
            >
          </div>
        </div>
        <div class="p-8">
          <div class="flex items-center gap-2 text-primary mb-3">
            <span class="material-symbols-outlined text-sm"
              >calendar_today</span
            >
            <span class="text-xs font-bold uppercase tracking-widest"
              >28 Out, 2023 • 19:30</span
            >
          </div>
          <h3
            class="text-2xl font-bold font-headline text-on-surface mb-6 leading-tight"
          >
            Ida ao Cinema
          </h3>
          <div class="flex gap-3">
            <button
              class="flex-1 py-3 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95 transition-transform"
            >
              Ver Detalhes
            </button>
            <button
              class="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors active:scale-95 transition-transform"
            >
              <span class="material-symbols-outlined">edit</span>
            </button>
          </div>
        </div>
      </div>
      <div
        class="group relative min-h-[300px] bg-surface-container-low rounded-[2rem] border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
      >
        <div
          class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary/20 transition-colors"
        >
          <span
            class="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors"
            >add</span
          >
        </div>
        <span
          class="font-headline font-bold text-on-surface-variant group-hover:text-primary"
          >Criar Novo Rolê</span
        >
      </div>
    </div>
    <div
      class="mt-20 glass-card p-12 rounded-[3rem] relative overflow-hidden atmospheric-glow"
    >
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"
      ></div>
      <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3
            class="text-4xl font-black font-headline text-on-surface leading-tight mb-6"
          >
            Pronto para o próximo<br /><span class="text-primary"
              >rolê inesquecível?</span
            >
          </h3>
          <p class="text-on-surface-variant text-lg mb-8 max-w-md">
            Organize horários, locais e convidados em um só lugar com o estilo
            que você merece.
          </p>
          <button
            class="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-extrabold text-lg shadow-[0_0_20px_rgba(219,144,255,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            Começar agora
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-surface-container-highest/40 p-6 rounded-3xl">
            <span
              class="text-3xl font-black font-headline text-primary block mb-2"
              >12</span
            >
            <span
              class="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >Amigos Online</span
            >
          </div>
          <div class="bg-surface-container-highest/40 p-6 rounded-3xl">
            <span
              class="text-3xl font-black font-headline text-primary block mb-2"
              >04</span
            >
            <span
              class="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >Convites Novos</span
            >
          </div>
          <div
            class="col-span-2 bg-surface-container-highest/40 p-6 rounded-3xl flex items-center gap-4"
          >
            <div class="flex -space-x-2">
              <img
                class="h-8 w-8 rounded-full border-2 border-surface"
                data-alt="minimalist avatar of a person"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgobM0RuaUD4Npn4kpJWsBoJmqNrGHRlcfNKfTSQzVZ4GAxwopRgOA3qBuuRm9fgoC7bHD2ZE6lQ5NKuPopO5wjTtYhwxLQzOmzfB05QjuwAhAOEnupEumB2qrs6lfMRRkTvW0fGOwpU-EwDE5jSpLwtbhCErwdy8aMsLmuq3M3tjUVI4RdnAi79QCfA2eJgoaXIxB3-UTPnstHAzLpI3ypi5eHVveyh4a9rMfLt3kpaWHlAT84cbgDjYLVJGJhazpYOEnWSgyXbLP"
              />
              <img
                class="h-8 w-8 rounded-full border-2 border-surface"
                data-alt="minimalist avatar of a person"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Au1InfdIP2zj_ErWGC2KCqvmnqAnRH_60CyWx0fBrEZ_N1WCTvgTGUhh2_gGMUyJr5jRsKYzRDqNG_2YZwm0-X1sFvWJwcdmWtd_cnuEUrdEGYp6wQltt3DYRYWdRzV-nDTM__etjbYgcN3uHIVYcAa7HyfYIHC14MGa72guMu2Ok5wyvwBkKFuhJJhQg-0gyXZITTZixdoMn57gLZST3v2ES056mt1ZMD0pnnXSpDPDqihHb8Hu4BYzwbZHIpmZMkQgFeaFU5di"
              />
              <img
                class="h-8 w-8 rounded-full border-2 border-surface"
                data-alt="minimalist avatar of a person"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2kQtKovd7TENFYspFkMSRSQuDREHh4vomtFAm_aWTQeXfc5C8CLpWsabuFW-JwRl7lEaMR3jcEt_Ndu5ewx2EG9kxWGCJe-yfcFFYKI5ie3DaVzajYviLNfxXiIDG8-gUpp_sVNO9bIMKy46bjHkB3-2beA0TDcbS8XMp6yFjD0vEVcAuntNqGWalRHlrzjkX62_-5eDD2ZDjROuED6d9piIEL3diqEzQ-slfxcg_AMI3OpCaksF0xvIEo-1BrVPI2heRVbAQ2kLu"
              />
            </div>
            <span
              class="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >+28 Amigos no ROLES</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>