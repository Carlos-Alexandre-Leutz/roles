export const emailService = {
  async send(to: string, subject: string, message: string) {
    const url = import.meta.env.VITE_EMAIL_API_URL;
    const token = import.meta.env.VITE_EMAIL_API_TOKEN;
    if (!url || !token || !to) return false;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Token": token,
        },
        body: JSON.stringify({ to, subject, message }),
      });
      return res.ok;
    } catch (e) {
      console.error("Erro ao enviar e-mail:", e);
      return false;
    }
  },
};
