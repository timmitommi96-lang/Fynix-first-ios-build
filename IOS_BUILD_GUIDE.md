# 🐉 Fynix iOS Build Guide
> [!TIP]
> **Bist du auf Windows?** Nutze den [vereinfachten Cloud-Guide hier](file:///c:/Users/TimIERE/Downloads/Fynix%20(4)/V1%20App%20Upload%20with%20Images%20and%20Detailed%20Prompt/SIMPLE_IOS_BUILD.md).
 (.ipa)

Da du auf Windows arbeitest, nutzen wir **GitHub Actions**, um die App in der Cloud auf einem virtuellen Mac zu bauen.

## 1. Projekt auf GitHub hochladen
1. Erstelle ein neues, privates Repository auf GitHub.
2. Lade deinen Code dort hoch (`git push`).
3. Die Datei `.github/workflows/ios-build.yml` triggert automatisch einen Build, sobald du etwas hochlädst.

## 2. Der Build-Prozess
- Gehe in deinem GitHub Repo auf den Tab **"Actions"**.
- Dort siehst du den **"Build iOS IPA"** Workflow.
- Wenn er fertig ist (grüner Haken), kannst du unter **"Artifacts"** das `ios-archive` herunterladen.

## 3. Die .ipa Datei (WICHTIG)
Der aktuelle Workflow baut ein **unsigniertes Archiv**. Damit daraus eine echte `.ipa` wird, die du auf deinem iPhone installieren kannst, verlangt Apple leider:
1. Einen **Apple Developer Account** (99€/Jahr).
2. Ein **Distribution Certificate** und ein **Provisioning Profile**.

### Wenn du einen Developer Account hast:
Du musst folgende "Secrets" in deinem GitHub Repo unter *Settings -> Secrets and Variables -> Actions* hinzufügen:
- `P12_BASE64`: Dein Zertifikat als Base64 String.
- `P12_PASSWORD`: Das Passwort des Zertifikats.
- `PROVISIONING_PROFILE_BASE64`: Dein Profile als Base64 String.

*Ohne diese Secrets erstellt GitHub zwar das Projekt, aber Apple erlaubt keinen App-Export als .ipa.*

## 4. UI Anpassungen
Ich habe bereits den **Safe Area Support** eingebaut. Das bedeutet:
- Die App wird nicht von der "Notch" (der schwarzen Aussparung oben am iPhone) überlagert.
- Der schwarze Balken unten ("Home Indicator") stört das Layout nicht.

## 5. Nächste Schritte
1. Schiebe den Code auf GitHub.
2. Prüfe den Build unter "Actions".
3. Lade das Archiv oder (falls signiert) die IPA herunter.

Viel Erfolg, Bro! Wenn du Hilfe bei den Apple-Zertifikaten brauchst, sag Bescheid. 🚀🐉
