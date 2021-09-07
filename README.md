# ha-config
我的HomeAssistant配置


电脑鼠标控制
```yaml
topic: windows/mouse
payload:
  type: left_click
  type: right_click
  type: m_click
  type: left_dblclick
  type: right_dblclick
  type: m_dblclick
  type: move
  x: 10
  y: 10
```

电脑键盘控制
```yaml
topic: windows/keyboard
payload:
  type: keypress
  type: keydown
  type: keyup
  key: 96
```