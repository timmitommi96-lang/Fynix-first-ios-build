# 🚀 Fynix iOS Build Guide (Windows/Simple)

Since you are on Windows, you cannot build the iOS app locally. Instead, we use **GitHub Actions** (the cloud) to do it for you.

## Schritt 1: Code hochladen
Stelle sicher, dass dein aktueller Code auf GitHub in deinem Repository ist.
- Falls du `git` nutzt: `git add .`, `git commit -m "iOS UI Update"`, `git push`.

## Schritt 2: Build starten (Cloud)
1. Gehe auf deine GitHub-Projektseite im Browser.
2. Klicke oben auf den Tab **"Actions"**.
3. Wähle links in der Liste **"Build iOS IPA"** aus.
4. Klicke rechts auf den Button **"Run workflow"** und dann auf den grünen Button.

## Schritt 3: Download
1. Warte ca. 5-10 Minuten, bis der Build fertig ist (grüner Haken).
2. Klicke auf den fertigen Build (z.B. "Build iOS IPA #12").
3. Scrolle ganz nach unten zu **"Artifacts"**.
4. Klicke auf **"ios-archive"**, um die Datei herunterzuladen.

---

> [!IMPORTANT]
> **Wichtiger Hinweis zum Testen auf dem iPhone:**
> - Der Cloud-Build erstellt ein **unsigned Archive**. Um es direkt auf deinem iPhone zu installieren, muss die Datei normalerweise mit einem **Apple Developer Account** signiert werden.
> - Wenn du einen Developer Account hast, kann ich dir helfen, die `ios-build.yml` so anzupassen, dass sie eine fertig signierte `.ipa` Datei ausgibt!

---

### Was ich bereits für dich vorbereitet habe:
- ✅ **Notch Support**: Das Design rutscht nicht mehr unter die Kamera.
- ✅ **Home Indicator**: Der untere Bereich ist für Gesten optimiert.
- ✅ **CI Workflow**: Die Automatisierung in `.github/workflows/ios-build.yml` ist startklar.
