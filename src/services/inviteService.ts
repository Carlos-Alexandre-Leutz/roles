import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const buildInviteLink = (roleId: string) =>
  `${window.location.origin}${import.meta.env.BASE_URL}#/convite/${roleId}`

export const shareInviteOnWhatsApp = (role: { title?: string; address?: string }, roleId: string) => {
  const text =
    `Bora pro rolê "${role.title || 'sem nome'}"` +
    (role.address ? ` em ${role.address}` : '') +
    `? 🎉\nConfirma sua presença aqui: ${buildInviteLink(roleId)}`
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
}

// Só aceita caminhos internos, para o ?redirect não virar open redirect.
export const safeRedirect = (route: Pick<RouteLocationNormalizedLoaded, 'query'>) => {
  const target = route.query.redirect
  return typeof target === 'string' && target.startsWith('/') && !target.startsWith('//')
    ? target
    : '/dashboard'
}
