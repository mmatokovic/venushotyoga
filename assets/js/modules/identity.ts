const tokenPattern = /(invite|recovery|confirmation|email_change)_token=/;

export function init(): void {
  if (tokenPattern.test(location.hash) && !location.pathname.startsWith('/admin/')) {
    location.replace(`/admin/${location.hash}`);
  }
}
