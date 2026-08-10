#!/usr/bin/env python3
"""
将 pdf/ 目录下的设计稿原图按项目分组转换为 WebP。
- 长边统一缩放到 1600px
- quality=80
- 文件名统一为 cover.webp / p{NN}.webp
- 跳过明显重复或多余的源文件（手动映射表）
"""
from __future__ import annotations
import re
import shutil
import sys
from pathlib import Path
from PIL import Image

SRC = Path("/Users/yangxiaowen/Desktop/codex-workspace/workspace/my-portfolio/pdf")
DST = Path("/Users/yangxiaowen/Desktop/codex-workspace/workspace/my-portfolio/public/portfolio")
MAX_SIDE = 1600
WEBP_QUALITY = 80

# 项目映射：源文件名 → (slug, page_index)
# page_index：0 = 封面；>=1 = 内容页；同名追加 suffix 区分
PROJECT_MAP: dict[str, tuple[str, int]] = {
    # SMART HOSPITAL 掌上医院小程序 (0-*)
    "0-0（医疗小程序项目）.png": ("smart-hospital", 0),
    "0-1.png": ("smart-hospital", 1),
    "0-2.png": ("smart-hospital", 2),
    "0-3.png": ("smart-hospital", 3),
    "0-4.png": ("smart-hospital", 4),
    "0-5.png": ("smart-hospital", 5),
    "0-6.png": ("smart-hospital", 6),
    "0-7.png": ("smart-hospital", 7),
    "0-8.png": ("smart-hospital", 8),
    "0-9.png": ("smart-hospital", 9),
    "0-10.png": ("smart-hospital", 10),
    "0-11.png": ("smart-hospital", 11),
    "0-12.png": ("smart-hospital", 12),
    "0-13.png": ("smart-hospital", 13),
    "0-14.png": ("smart-hospital", 14),
    # 天津公安民生服务平台 (1-*)
    "1-0（政务类移动端项目）.png": ("tianjin-public-security", 0),
    "1-1.png": ("tianjin-public-security", 1),
    "1-2.png": ("tianjin-public-security", 2),
    "1-3.png": ("tianjin-public-security", 3),
    "1-4.png": ("tianjin-public-security", 4),
    "1-5.png": ("tianjin-public-security", 5),
    "1-6.png": ("tianjin-public-security", 6),
    "1-7.png": ("tianjin-public-security", 7),
    "1-8.png": ("tianjin-public-security", 8),
    "1-9.png": ("tianjin-public-security", 9),
    "1-10.png": ("tianjin-public-security", 10),
    # 信息发布系统 (2-*)
    "2-0(B端管理后台).png": ("info-publishing", 0),
    "2-1.png": ("info-publishing", 1),
    "2-2.png": ("info-publishing", 2),
    "2-3.png": ("info-publishing", 3),
    "2-4.png": ("info-publishing", 4),
    "2-5.png": ("info-publishing", 5),
    "2-6.png": ("info-publishing", 6),
    "2-7.png": ("info-publishing", 7),
    "2-8.png": ("info-publishing", 8),
    "2-9.png": ("info-publishing", 9),
    "2-10.png": ("info-publishing", 10),
    "2-11.png": ("info-publishing", 11),
    "2-12.png": ("info-publishing", 12),
    "2-13.png": ("info-publishing", 13),
    "2-14.png": ("info-publishing", 14),
    "2-15.png": ("info-publishing", 15),
    # Finepak 跨境电商 (3-*)
    "3-0（跨境电商）.png": ("finepak", 0),
    "3-1.png": ("finepak", 1),
    "3-2.png": ("finepak", 2),
    "3-3.png": ("finepak", 3),
    # 3-4.png 不存在
    "3-5.png": ("finepak", 4),   # 跳过 4 号位以保留原页码
    "3-6.png": ("finepak", 5),
    "3-7.png": ("finepak", 6),
    "3-8.png": ("finepak", 7),
    "3-9.png": ("finepak", 8),
    # 数据可视化项目合集
    # 选 4-0封面.png 作为正式封面（最新版本）
    "4-0封面.png": ("data-viz", 0),
    "4-1.png": ("data-viz", 1),
    # 3-0(数据可视化合集).png 与 3-0封面.png 是数据可视化的备用封面，舍弃（避免 3 个重复封面）
}


def to_webp(src: Path, dst: Path) -> tuple[int, int]:
    """压缩单个 PNG → WebP，返回 (源大小, 目标大小) 字节。"""
    src_bytes = src.stat().st_size
    with Image.open(src) as img:
        # 转为 RGB（PNG 可能有 RGBA / P 模式；WebP 支持 alpha 但此处为设计稿不需要）
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGB")
        # 缩放：长边 > MAX_SIDE 时等比缩小
        w, h = img.size
        if max(w, h) > MAX_SIDE:
            scale = MAX_SIDE / max(w, h)
            new_size = (int(w * scale), int(h * scale))
            img = img.resize(new_size, Image.LANCZOS)
        dst.parent.mkdir(parents=True, exist_ok=True)
        img.save(dst, "WEBP", quality=WEBP_QUALITY, method=6)
    dst_bytes = dst.stat().st_size
    return src_bytes, dst_bytes


def main() -> int:
    if not SRC.is_dir():
        print(f"ERROR: src not found: {SRC}", file=sys.stderr)
        return 1
    if DST.exists():
        shutil.rmtree(DST)

    src_total = 0
    dst_total = 0
    used: list[tuple[str, str, int, int]] = []
    skipped: list[str] = []

    for png in sorted(SRC.iterdir()):
        if png.suffix.lower() != ".png":
            continue
        if png.name not in PROJECT_MAP:
            skipped.append(png.name)
            continue
        slug, idx = PROJECT_MAP[png.name]
        # 命名：cover.webp 或 p{NN}.webp
        out_name = "cover.webp" if idx == 0 else f"p{idx:02d}.webp"
        dst = DST / slug / out_name
        if dst.exists():
            # 同名冲突时加 -a 后缀
            stem, suf = out_name.rsplit(".", 1)
            dst = DST / slug / f"{stem}-a.{suf}"
        sb, db = to_webp(png, dst)
        src_total += sb
        dst_total += db
        used.append((slug, out_name, sb, db))

    print(f"Processed {len(used)} images")
    print(f"  src total: {src_total/1024/1024:.1f} MB")
    print(f"  dst total: {dst_total/1024/1024:.1f} MB")
    print(f"  compression: {(1 - dst_total/src_total)*100:.1f}%")
    print()
    by_project: dict[str, list[tuple[str, int, int]]] = {}
    for slug, name, sb, db in used:
        by_project.setdefault(slug, []).append((name, sb, db))
    for slug, items in by_project.items():
        total_db = sum(db for _, _, db in items)
        print(f"  {slug}: {len(items)} files, {total_db/1024/1024:.2f} MB")

    if skipped:
        print(f"\nSkipped {len(skipped)} files (not in map):")
        for s in skipped:
            print(f"  - {s}")

    return 0


if __name__ == "__main__":
    sys.exit(main())