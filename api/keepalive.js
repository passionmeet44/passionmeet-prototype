// PassionMeet — ping quotidien de la base Supabase (plan gratuit).
// Sans aucune visite pendant 7 jours, Supabase met le projet en pause :
// cette petite requête, lancée chaque jour par Vercel, l'en empêche.
// Elle ne lit que la liste publique des lieux (aucune donnée de membre).
const SUPABASE_URL = 'https://mcmnbhkrxodviiiycqdc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Gm7SpnOPHixW_gZjUiZBGw_o_r5eKXt'; // clé publique, déjà présente dans l'app

module.exports = async (req, res) => {
  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/venues?select=id&limit=1', {
      headers: { apikey: SUPABASE_ANON_KEY }
    });
    res.status(200).json({ ok: r.ok, status: r.status, at: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e && e.message || e) });
  }
};
