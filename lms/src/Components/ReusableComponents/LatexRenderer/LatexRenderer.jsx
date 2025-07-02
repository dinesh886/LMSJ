    import React from "react"
    import "katex/dist/katex.min.css"
    import { BlockMath, InlineMath } from "react-katex"
    import DOMPurify from "dompurify"

    const LatexRenderer = ({ content, isInline = false }) => {
        if (!content) return <div className="latex-placeholder">Content will appear here</div>

        const renderMixedContent = () => {
            try {
                const normalizeContent = (text) => {
                    // Handle cases like "A.\n$..." or "A.\n\(...)" by merging them
                    return text
                        // Fix letter-dot-newline-LaTeX cases
                        .replace(/([A-Za-z])\.\s*\n\s*([$\\][(\[]?)/g, '$1. $2')
                        // Fix number-dot-newline-LaTeX cases (for numbered lists)
                        .replace(/(\d+)\.\s*\n\s*([$\\][(\[]?)/g, '$1. $2')
                        // Fix general dot-newline-LaTeX cases
                        .replace(/\.\s*\n\s*([$\\][(\[]?)/g, '. $1');
                }

                const segments = []
                let remaining = normalizeContent(content) // ✅ Apply normalization here

                while (remaining.length > 0) {
                    const matchers = [
                        { type: "display", regex: /^\$\$(.+?)\$\$/, start: "$$", end: "$$" },
                        { type: "display", regex: /^\\\[(.+?)\\\]/, start: "\\[", end: "\\]" },
                        { type: "inline", regex: /^\\\((.+?)\\\)/, start: "\\(", end: "\\)" },
                        { type: "inline", regex: /^\$(.+?)\$/, start: "$", end: "$" }
                    ]

                    let found = false

                    for (let matcher of matchers) {
                        const startIdx = remaining.indexOf(matcher.start)
                        if (startIdx !== -1) {
                            const endIdx = remaining.indexOf(matcher.end, startIdx + matcher.start.length)
                            if (endIdx !== -1) {
                                if (startIdx > 0) {
                                    const htmlPart = remaining.substring(0, startIdx)
                                    segments.push({ type: "html", content: htmlPart })
                                }

                                const mathContent = remaining.substring(
                                    startIdx + matcher.start.length,
                                    endIdx
                                ).trim()

                                segments.push({
                                    type: matcher.type,
                                    content: mathContent
                                })

                                remaining = remaining.substring(endIdx + matcher.end.length)
                                found = true
                                break
                            }
                        }
                    }

                    if (!found) {
                        segments.push({ type: "html", content: remaining })
                        break
                    }
                }

                return (
                    <div className="latex-content">
                        {segments.map((segment, index) => {
                            try {
                                if (segment.type === "html") {
                                    return <HTMLRenderer key={index} content={segment.content} />
                                } else if (segment.type === "display") {
                                    return (
                                        <div key={index} className="math-display-wrapper">
                                            <BlockMath math={segment.content} />
                                        </div>
                                    )
                                } else if (segment.type === "inline") {
                                    return (
                                        <span key={index} className="math-inline-wrapper">
                                            <InlineMath math={segment.content} />
                                        </span>
                                    )
                                }
                                return null
                            } catch (mathError) {
                                console.error(`Math rendering error for segment ${index}:`, mathError)
                                return (
                                    <span key={index} className="latex-error">
                                        [Math Error: {segment.content}]
                                    </span>
                                )
                            }
                        })}
                    </div>
                )
            } catch (e) {
                console.error("Content rendering error:", e)
                return <div className="latex-error">Error rendering content: {e.message}</div>
            }
        }
        
        const renderSimpleLatex = (text) => {
            try {
                const cleanText = text.replace(/^\$\$|\$\$$/g, "").trim()
                return <InlineMath math={cleanText} />
            } catch (e) {
                console.error("Simple LaTeX rendering error:", e)
                return <span className="latex-error">[LaTeX Error]</span>
            }
        }

        return isInline ? renderSimpleLatex(content) : renderMixedContent()
    }

    const HTMLRenderer = ({ content }) => {
        if (!content) return null

        const purifyConfig = {
            ALLOWED_TAGS: [
                "p", "br", "strong", "em", "u", "i", "b", "span", "div", "img", "a",
                "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "code", "pre"
            ],
            ALLOWED_ATTR: ["src", "alt", "title", "width", "height", "style", "class", "id", "href", "target", "rel"],
            ADD_ATTR: ["onerror", "onload"],
            ALLOW_DATA_ATTR: true
        }

        const processHTML = (html) => {
            return html.replace(/<img([^>]*?)src=["']([^"']*?)["']([^>]*?)>/gi, (match, beforeSrc, src, afterSrc) => {
                return `<img${beforeSrc}src="${src}"${afterSrc} 
                    onerror="this.style.display='none'; this.nextSibling.style.display='inline';" 
                    onload="this.nextSibling.style.display='none';"
                    class="question-image"
                /><span class="image-error" style="display:none;">Image could not be loaded: ${src.split("/").pop()}</span>`
            })
        }

        const cleanHTML = DOMPurify.sanitize(processHTML(content), purifyConfig)
        return <span dangerouslySetInnerHTML={{ __html: cleanHTML }} className="html-content" />
    }

    export const cleanLatex = (text) => {
        if (!text) return ""
        return text
            .replace(/\\[{}]/g, "")
            .replace(/\\[([]/g, "")
            .replace(/\\[)\]]/g, "")
            .replace(/\$\$/g, "")
    }

    export default React.memo(LatexRenderer)
