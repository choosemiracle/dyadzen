"""Manual browser smoke tests for Dyad Zen. Requires Python Playwright and Chrome.
Run from project root using the interpreter that has Playwright installed.
"""
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:5173/dyadzen/"
ROUTES = ["/", "/learn", "/practice", "/guide", "/library", "/community"]

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    errors = []
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.on("pageerror", lambda err: errors.append(str(err)))

    for route in ROUTES:
        page.goto(BASE + "#" + route, wait_until="networkidle")
        assert page.locator("main h1").count() == 1, (route, "missing heading")
        assert page.locator("main").inner_text().strip(), (route, "empty main content")
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 2"), (route, "desktop overflow")
        print("OK desktop route", route)

    page.goto(BASE + "#/learn")
    page.get_by_role("button", name="标记本课已学习").click()
    assert "01" in page.evaluate("localStorage.getItem('dyadzen-completed-v1')")
    page.reload()
    assert page.get_by_text("已标记完成 · 点击取消").is_visible()
    page.get_by_role("button", name="已标记完成 · 点击取消").click()
    print("OK learning progress and persistence")

    page.goto(BASE + "#/practice")
    start = page.get_by_role("button", name="开始 / 继续")
    assert start.is_enabled()
    assert page.locator(".clock-display").inner_text() == "05:00"
    assert "5 分钟 × 4 轮 · 20 分钟" in page.locator(".mode-card.selected").inner_text()
    start.click()
    assert page.get_by_text("开始前，请与搭档确认共同约定").is_visible()
    assert page.locator(".clock-display").inner_text() == "05:00"
    page.get_by_role("button", name="暂不开始").click()
    assert page.get_by_role("button", name="开始 / 继续").is_enabled()
    start.click()
    page.get_by_role("button", name="已确认，开始练习").click()
    assert page.get_by_role("checkbox").first.is_checked()
    assert page.get_by_role("button", name="暂停练习").is_visible()
    page.get_by_role("button", name="暂停练习").click()
    page.get_by_role("button", name="重置").click()
    page.get_by_role("checkbox").first.uncheck()
    start.click()
    assert page.get_by_text("开始前，请与搭档确认共同约定").is_visible()
    assert page.get_by_role("dialog").is_visible()
    page.get_by_role("button", name="暂不开始").click()
    page.get_by_role("checkbox").first.check()
    assert not page.get_by_text("开始前，请与搭档确认共同约定").is_visible()
    assert start.is_enabled()
    start.click()
    page.wait_for_timeout(500)
    assert page.get_by_role("button", name="暂停练习").is_visible()
    page.get_by_role("button", name="暂停练习").click()
    page.get_by_role("button", name="重置").click()
    page.get_by_role("button", name="结构演示").click()
    assert "第 1 / 8 轮" in page.locator(".timer-role-row").inner_text()
    assert "05:00" in page.locator(".clock-display").inner_text()
    print("OK five-minute default, consent confirmation, pause and classic reference mode")

    page.goto(BASE + "#/guide")
    page.get_by_role("button", name="B 温和暂停，提醒倾听者把建议放下，回到安静接收").click()
    assert page.get_by_text("这是较稳妥的选择").is_visible()
    print("OK guide scenario")

    page.goto(BASE + "#/library")
    page.get_by_role("button", name="教育理论").click()
    assert page.locator(".ref-card").count() == 1
    print("OK library filter")

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, device_scale_factor=1)
    mobile_errors = []
    mobile.on("pageerror", lambda err: mobile_errors.append(str(err)))
    for route in ROUTES:
        mobile.goto(BASE + "#" + route, wait_until="networkidle")
        assert mobile.locator("main h1").count() == 1, (route, "mobile missing heading")
        width = mobile.evaluate("[document.documentElement.scrollWidth, innerWidth]")
        assert width[0] <= width[1] + 2, (route, "mobile horizontal overflow", width)
        print("OK mobile route", route)

    mobile.goto(BASE + "#/")
    mobile.get_by_role("button", name="打开菜单").click()
    mobile.get_by_role("navigation", name="网站主导航").get_by_role("link", name="系统课程").click()
    assert mobile.locator("main h1").is_visible()
    print("OK mobile navigation")

    assert not errors, errors
    assert not mobile_errors, mobile_errors
    print("PASS browser smoke tests")
    browser.close()
