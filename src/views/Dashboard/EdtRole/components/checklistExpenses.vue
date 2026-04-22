<template>
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
            <p class="text-white font-bold">Comprar Carne (Picanha/Alcatra)</p>
            <p class="text-xs text-on-surface-variant">
              Responsável:
              <span class="text-primary font-semibold">Ricardo Mendes</span>
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
            <p class="text-white font-bold">Trazer Carvão e Sal Grosso</p>
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
            <p class="text-white font-bold">Bebidas (Cerveja/Refrigerante)</p>
            <p class="text-xs text-on-surface-variant">
              Responsável:
              <span class="text-primary font-semibold">Ana Paula</span>
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
        <p class="text-3xl font-headline font-black text-white">R$ 775,00</p>
      </div>
      <button
        class="bg-primary text-on-primary-container px-8 py-3 rounded-full font-bold"
      >
        Dividir Conta
      </button>
    </div>
  </div>
</template>