import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A5
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import BaseDocTemplate, Frame, Image, KeepTogether, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.platypus.tableofcontents import TableOfContents

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "Holzpflege-leicht-gemacht.md"
OUTPUT = ROOT / "exports" / "Holzpflege-leicht-gemacht.pdf"
EARTH = colors.HexColor("#5B4636")
INK = colors.HexColor("#2C2A26")
MUTED = colors.HexColor("#69645C")
PAPER = colors.HexColor("#F8F6F1")
CALLOUT = colors.HexColor("#F2EEE7")


def register_fonts():
    roots = [Path("C:/Windows/Fonts"), Path("C:/Users/James/.cache/codex-runtimes/codex-primary-runtime/dependencies/fonts")]
    candidates = {
        "BookSans": ["calibri.ttf", "Carlito-Regular.ttf", "arial.ttf"],
        "BookSans-Bold": ["calibrib.ttf", "Carlito-Bold.ttf", "arialbd.ttf"],
        "BookSans-Italic": ["calibrii.ttf", "Carlito-Italic.ttf", "ariali.ttf"],
        "BookSans-BoldItalic": ["calibriz.ttf", "Carlito-BoldItalic.ttf", "arialbi.ttf"],
    }
    for name, options in candidates.items():
        found = None
        for root in roots:
            for option in options:
                path = root / option
                if path.exists():
                    found = path
                    break
            if found:
                break
        if not found:
            raise FileNotFoundError(f"Schriftdatei für {name} nicht gefunden")
        pdfmetrics.registerFont(TTFont(name, str(found)))
    pdfmetrics.registerFontFamily("BookSans", normal="BookSans", bold="BookSans-Bold", italic="BookSans-Italic", boldItalic="BookSans-BoldItalic")


def md_inline(text):
    text = html.escape(text.replace("  ", " "))
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"\*([^*]+)\*", r"<i>\1</i>", text)
    return text


class BookDoc(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, **kwargs)
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="main")
        self.addPageTemplates(PageTemplate(id="book", frames=[frame], onPage=self.draw_page))

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(PAPER)
        canvas.rect(0, 0, A5[0], A5[1], fill=1, stroke=0)
        if doc.page > 1:
            canvas.setFont("BookSans-Bold", 6.8)
            canvas.setFillColor(MUTED)
            canvas.drawCentredString(A5[0] / 2, A5[1] - 0.8 * cm, "HOLZPFLEGE LEICHT GEMACHT")
            canvas.setFont("BookSans", 7.5)
            canvas.drawCentredString(A5[0] / 2, 0.7 * cm, str(doc.page))
        canvas.restoreState()

    def afterFlowable(self, flowable):
        level = getattr(flowable, "toc_level", None)
        if level is not None:
            text = getattr(flowable, "toc_text", flowable.getPlainText())
            self.notify("TOCEntry", (level, text, self.page))


def make_styles():
    base = getSampleStyleSheet()
    styles = {
        "body": ParagraphStyle("Body", parent=base["BodyText"], fontName="BookSans", fontSize=9.2, leading=11.6, textColor=INK, alignment=TA_JUSTIFY, spaceAfter=5.5, splitLongWords=True, allowWidows=0, allowOrphans=0),
        "h1": ParagraphStyle("H1", parent=base["Heading1"], fontName="BookSans-Bold", fontSize=15, leading=17, textColor=EARTH, spaceBefore=12, spaceAfter=6, keepWithNext=True),
        "h2": ParagraphStyle("H2", parent=base["Heading2"], fontName="BookSans-Bold", fontSize=11.5, leading=13.5, textColor=EARTH, spaceBefore=9, spaceAfter=4, keepWithNext=True),
        "part_label": ParagraphStyle("PartLabel", parent=base["Normal"], fontName="BookSans-Bold", fontSize=8.5, leading=10, textColor=EARTH, alignment=TA_CENTER, spaceAfter=7),
        "part_title": ParagraphStyle("PartTitle", parent=base["Heading1"], fontName="BookSans-Bold", fontSize=21, leading=24, textColor=EARTH, alignment=TA_CENTER, spaceAfter=20),
        "caption": ParagraphStyle("Caption", parent=base["Normal"], fontName="BookSans-Italic", fontSize=7.5, leading=9, textColor=MUTED, alignment=TA_CENTER, spaceBefore=2, spaceAfter=8),
        "bullet": ParagraphStyle("Bullet", parent=base["BodyText"], fontName="BookSans", fontSize=9.1, leading=11.3, textColor=INK, leftIndent=0.55 * cm, firstLineIndent=-0.3 * cm, bulletIndent=0.12 * cm, spaceAfter=2.5),
        "number": ParagraphStyle("Number", parent=base["BodyText"], fontName="BookSans", fontSize=9.1, leading=11.3, textColor=INK, leftIndent=0.6 * cm, firstLineIndent=-0.35 * cm, spaceAfter=2.5),
        "front": ParagraphStyle("Front", parent=base["BodyText"], fontName="BookSans", fontSize=8.7, leading=11, textColor=INK, alignment=TA_LEFT, spaceAfter=5),
        "toc_part": ParagraphStyle("TocPart", parent=base["Normal"], fontName="BookSans-Bold", fontSize=9.5, leading=12, textColor=EARTH, leftIndent=0, firstLineIndent=0, spaceBefore=7, spaceAfter=2),
        "toc_chapter": ParagraphStyle("TocChapter", parent=base["Normal"], fontName="BookSans", fontSize=8.4, leading=10.3, textColor=INK, leftIndent=0.35 * cm, firstLineIndent=0, spaceBefore=0, spaceAfter=1),
    }
    return styles


def heading(text, style, level=None):
    p = Paragraph(md_inline(text), style)
    if level is not None:
        p.toc_level = level
        p.toc_text = re.sub(r"^\d+\.\s*", "", text) if level == 1 else text
    return p


def content_flowable(line, styles):
    image_match = re.match(r"!\[(.+?)\]\((.+?)\)", line)
    if image_match:
        path = ROOT / image_match.group(2)
        image = Image(str(path), width=10.8 * cm, height=7.2 * cm)
        image.hAlign = "CENTER"
        image.altText = image_match.group(1)
        return image
    if line.startswith("*Abb. "):
        return Paragraph(md_inline(line.strip("*")), styles["caption"])
    if line.startswith("- "):
        return Paragraph(md_inline(line[2:]), styles["bullet"], bulletText="•")
    numbered = re.match(r"^(\d+)\. (.+)", line)
    if numbered:
        return Paragraph(md_inline(numbered.group(2)), styles["number"], bulletText=numbered.group(1) + ".")
    return Paragraph(md_inline(line), styles["body"])


def add_frontmatter(story, styles, lines):
    start = next(i for i, line in enumerate(lines) if line == "## Impressum")
    end = next(i for i, line in enumerate(lines) if line == "# Inhaltsverzeichnis")
    block = lines[start:end]
    for line in block:
        if not line or line == "---":
            continue
        if line == "## Impressum":
            story.append(heading("Impressum", styles["h1"]))
        elif line == "## Sicherheits- und Haftungshinweis":
            story.append(heading("Sicherheits- und Haftungshinweis", styles["h1"]))
        elif line == "# Vorwort":
            story.append(PageBreak())
            story.append(heading("Vorwort", styles["h1"]))
        elif line.startswith("## "):
            story.append(heading(line[3:], styles["h2"]))
        elif line.startswith("Wichtiger Veröffentlichungshinweis:") or line.startswith("Ölgetränkte Lappen"):
            table = Table([[Paragraph(md_inline(line), styles["front"])]], colWidths=[10.7 * cm])
            table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), CALLOUT), ("BOX", (0, 0), (-1, -1), 0.4, colors.HexColor("#D7CEC1")), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7)]))
            story.append(table)
            story.append(Spacer(1, 6))
        elif not line.startswith("#") and not line.startswith("Erste digitale Ausgabe") and not line.startswith("Praxisbuch für"):
            story.append(Paragraph(md_inline(line), styles["front"]))


def build_story(styles):
    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    story = [Spacer(1, 1.15 * cm), Paragraph("PRAXISBUCH", styles["part_label"])]
    title_style = ParagraphStyle("CoverTitle", parent=styles["part_title"], fontSize=27, leading=29, spaceAfter=8)
    subtitle_style = ParagraphStyle("CoverSub", parent=styles["body"], fontSize=12, leading=15, alignment=TA_CENTER, textColor=INK, spaceAfter=10)
    story.append(Paragraph("Holzpflege<br/>leicht gemacht", title_style))
    story.append(Paragraph("Holz verstehen, Oberflächen erhalten,<br/>Schäden sicher beheben", subtitle_style))
    story.append(Paragraph("Thomas Frenzel", styles["part_label"]))
    cover = Image(str(ROOT / "illustrationen" / "01-holzaufbau.png"), width=9.6 * cm, height=6.4 * cm)
    cover.hAlign = "CENTER"
    cover.altText = "Bleistiftzeichnung eines Holzblocks mit sichtbaren Faserflächen"
    story.extend([cover, Spacer(1, 8), Paragraph("Erste digitale Ausgabe · 2026", styles["caption"]), PageBreak()])
    add_frontmatter(story, styles, lines)
    story.append(PageBreak())
    story.append(heading("Inhaltsverzeichnis", styles["h1"]))
    toc = TableOfContents()
    toc.levelStyles = [styles["toc_part"], styles["toc_chapter"]]
    story.append(toc)
    body_start = next(i for i, line in enumerate(lines) if line == "# Teil I - Holz richtig lesen")
    for line in lines[body_start:]:
        if not line or line == "---":
            continue
        if line.startswith("# Teil "):
            story.append(PageBreak())
            label, title = line[2:].split(" - ", 1)
            story.extend([Spacer(1, 2.1 * cm), heading(label.upper(), styles["part_label"], 0), heading(title, styles["part_title"]), Spacer(1, 1.2 * cm)])
        elif re.match(r"# \d+\. ", line):
            story.append(heading(line[2:], styles["h1"], 1))
        elif line.startswith("# Anhang"):
            story.append(PageBreak())
            story.append(heading(line[2:], styles["h1"], 0))
        elif line.startswith("## "):
            story.append(heading(line[3:], styles["h2"]))
        elif line.startswith("# "):
            story.append(heading(line[2:], styles["h1"]))
        else:
            flowable = content_flowable(line, styles)
            if isinstance(flowable, Image):
                story.append(Spacer(1, 4))
            story.append(flowable)
    return story


def main():
    register_fonts()
    styles = make_styles()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BookDoc(str(OUTPUT), pagesize=A5, leftMargin=1.8 * cm, rightMargin=1.6 * cm, topMargin=1.65 * cm, bottomMargin=1.45 * cm, title="Holzpflege leicht gemacht", author="Thomas Frenzel", subject="Praxisbuch über Holzpflege")
    doc.multiBuild(build_story(styles))


if __name__ == "__main__":
    main()
