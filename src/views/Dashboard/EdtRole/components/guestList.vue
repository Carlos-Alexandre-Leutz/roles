<template>
  <div class="glass-panel p-8 rounded-[2rem] border border-outline-variant/10">
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
</template>