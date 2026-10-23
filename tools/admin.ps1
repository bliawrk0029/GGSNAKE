# GGSNAKE admin helper (Windows PowerShell)
# The admin key is never stored in this file and never put in a URL.
# Usage:
#   .\tools\admin.ps1 stats
#   .\tools\admin.ps1 winners
#   .\tools\admin.ps1 user 123456789
#   .\tools\admin.ps1 run 42
#   .\tools\admin.ps1 ban 123456789        (unban: .\tools\admin.ps1 unban 123456789)
#   .\tools\admin.ps1 setup
#   .\tools\admin.ps1 reset-season
# Optional: set $env:GGSNAKE_API once per window, otherwise you will be asked.

param(
    [Parameter(Mandatory = $true, Position = 0)]
    [ValidateSet("stats", "winners", "user", "run", "ban", "unban", "setup", "reset-season")]
    [string]$Action,
    [Parameter(Position = 1)]
    [string]$Id
)

$api = $env:GGSNAKE_API
if (-not $api) { $api = Read-Host "Server URL (https://...workers.dev)" }
$api = $api.TrimEnd("/")
if ($api -notmatch "^https://") { Write-Error "Server URL must start with https://"; exit 1 }

if (-not $script:GGKey) {
    $secure = Read-Host "Admin key" -AsSecureString
    $script:GGKey = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
}
$headers = @{ "X-Admin-Key" = $script:GGKey }

switch ($Action) {
    "stats"        { $m = "GET";  $p = "/admin/stats" }
    "winners"      { $m = "GET";  $p = "/admin/winners" }
    "setup"        { $m = "GET";  $p = "/admin/setup" }
    "user"         { $m = "GET";  $p = "/admin/user?id=$Id" }
    "run"          { $m = "GET";  $p = "/admin/run?id=$Id" }
    "ban"          { $m = "POST"; $p = "/admin/ban?id=$Id" }
    "unban"        { $m = "POST"; $p = "/admin/ban?id=$Id&banned=0" }
    "reset-season" {
        $ok = Read-Host "This wipes all season scores. Type YES to continue"
        if ($ok -ne "YES") { Write-Host "Cancelled."; exit 0 }
        $m = "POST"; $p = "/admin/reset-season?confirm=yes"
    }
}
if ($Action -in @("user", "run", "ban", "unban") -and -not $Id) { Write-Error "Add an id."; exit 1 }

try {
    $r = Invoke-RestMethod -Method $m -Uri ($api + $p) -Headers $headers
    $r | ConvertTo-Json -Depth 8
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
