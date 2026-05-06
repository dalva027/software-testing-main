# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - link "🛒 TechMart" [ref=e4]:
        - /url: /
      - link "🛒 Cart (0)" [ref=e6]:
        - /url: /cart.html
  - main [ref=e7]:
    - generic [ref=e8]:
      - heading "Login to TechMart" [level=1] [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]: Email Address
          - textbox "Email Address" [ref=e13]:
            - /placeholder: you@example.com
        - generic [ref=e14]:
          - generic [ref=e15]: Password
          - textbox "Password" [ref=e16]:
            - /placeholder: Enter your password
        - button "Login" [ref=e17] [cursor=pointer]
      - paragraph [ref=e18]:
        - text: Don't have an account?
        - link "Sign up here" [ref=e19]:
          - /url: /register.html
      - generic [ref=e20]:
        - paragraph [ref=e21]:
          - strong [ref=e22]: "Demo Account:"
        - paragraph [ref=e23]: "Email: demo@techmart.com"
        - paragraph [ref=e24]: "Password: demo123"
```