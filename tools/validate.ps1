$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$requiredDirectories = @("html", "assets", "data", "css", "docs", "js", "tools")
$requiredFiles = @(
    "html\index.html",
    "html\directory.html",
    "html\bulletin.html",
    "html\about.html",
    "html\login.html",
    "html\register.html",
    "html\maker.html",
    "html\quote.html",
    "html\dashboard.html",
    "html\officer.html",
    "assets\mark.svg",
    "assets\maker-goods.svg",
    "data\demo-data.js",
    "css\styles.css",
    "js\app.js",
    "docs\README.md",
    "docs\ai_assisted_tasks.md",
    "docs\manuscript_and_references.md"
)

foreach ($directory in $requiredDirectories) {
    if (-not (Test-Path -LiteralPath (Join-Path $root $directory) -PathType Container)) {
        throw "Required directory is missing: $directory"
    }
}

foreach ($file in $requiredFiles) {
    if (-not (Test-Path -LiteralPath (Join-Path $root $file) -PathType Leaf)) {
        throw "Required file is missing: $file"
    }
}

foreach ($obsolete in @("client", "server", "node_modules")) {
    if (Test-Path -LiteralPath (Join-Path $root $obsolete)) {
        throw "Obsolete workspace-root directory remains: $obsolete"
    }
}

foreach ($htmlFile in Get-ChildItem -LiteralPath (Join-Path $root "html") -Filter "*.html") {
    $html = Get-Content -LiteralPath $htmlFile.FullName -Raw
    foreach ($match in [regex]::Matches($html, '(?:src|href)="([^"]+)"')) {
        $reference = $match.Groups[1].Value
        if ($reference -match '^(?:https?:|mailto:|#|data:)') {
            continue
        }
        $relativePath = ($reference -split '[?#]', 2)[0]
        if ($relativePath -and -not (Test-Path -LiteralPath (Join-Path $htmlFile.DirectoryName $relativePath))) {
            throw "Broken local reference in $($htmlFile.Name): $reference"
        }
    }
}

$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
    & $node.Source --check (Join-Path $root "js\app.js")
    if ($LASTEXITCODE -ne 0) { throw "JavaScript syntax check failed for js\app.js" }
    & $node.Source --check (Join-Path $root "data\demo-data.js")
    if ($LASTEXITCODE -ne 0) { throw "JavaScript syntax check failed for data\demo-data.js" }
} else {
    Write-Warning "Node.js is unavailable; JavaScript syntax checks were skipped."
}

Write-Output "Static project structure, HTML references, and available JavaScript syntax checks passed."
