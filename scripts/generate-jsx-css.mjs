import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, "lib", "components");
const tempDir = path.join(rootDir, ".tmp-jsx-css");

const componentSources = [
    ["Autocomplete", "Autocomplete.tsx"],
    ["Button", "Button.tsx"],
    ["Calendar", "Calendar.tsx"],
    ["Card", "Card.tsx"],
    ["Carousel", "Carousel.tsx"],
    ["Chart", "Chart.tsx"],
    ["Checkbox", "Checkbox.tsx"],
    ["Heading", "Heading.tsx"],
    ["Headings", "Headings.tsx"],
    ["Input", "Input.tsx"],
    ["InputFile", "InputFile.tsx"],
    ["Loader", "Loader.tsx"],
    ["Message", "Message.tsx"],
    ["Modal", "Modal.tsx"],
    ["NavigationRoutes", "NavigationRoutes.tsx"],
    ["Pagination", "Pagination.tsx"],
    ["Select", "Select.tsx"],
    ["Slider", "Slider.tsx"],
    ["Stepper", "Stepper.tsx"],
    ["Toggle", "Toggle.tsx"],
];

const extraSources = {
    Chart: ["components/ui/chart.tsx"],
};

function injectCssImport(code, importPath) {
    if (code.includes(importPath)) {
        return code;
    }

    const useClientMatch = code.match(/^("use client"|'use client');\n\n?/);
    if (useClientMatch) {
        return `${useClientMatch[0]}import "${importPath}";\n${code.slice(useClientMatch[0].length)}`;
    }

    return `import "${importPath}";\n${code}`;
}

function transpileTsxToJsx(source, filePath) {
    const result = ts.transpileModule(source, {
        compilerOptions: {
            jsx: ts.JsxEmit.Preserve,
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2020,
            importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
        },
        fileName: filePath,
    });

    return result.outputText.replace(/\nexport \{\};\s*$/u, "\n");
}

async function buildCss({ componentName, tsxPath, jsxPath, cssPath }) {
    const tempInputPath = path.join(tempDir, `${componentName}.css`);
    const sources = [tsxPath, jsxPath, ...(extraSources[componentName] ?? [])]
        .map((sourcePath) =>
            `@source "${path.relative(rootDir, path.join(rootDir, sourcePath)).replaceAll(path.sep, "/")}";`
        )
        .join("\n");

    const inputCss = [
        '@import "tailwindcss";',
        "@custom-variant dark (&:is(.dark *));",
        sources,
        "",
    ].join("\n");

    await fs.writeFile(tempInputPath, inputCss, "utf8");

    const result = await postcss([tailwindcss()]).process(inputCss, {
        from: tempInputPath,
    });

    await fs.writeFile(cssPath, result.css, "utf8");
}

async function main() {
    await fs.mkdir(tempDir, { recursive: true });

    for (const [componentDirName, sourceFile] of componentSources) {
        const componentDir = path.join(componentsDir, componentDirName);
        const tsxPath = path.join(componentDir, sourceFile);
        const jsxDir = path.join(componentDir, "jsx");
        const jsxPath = path.join(jsxDir, sourceFile.replace(/\.tsx$/u, ".jsx"));
        const cssPath = path.join(jsxDir, sourceFile.replace(/\.tsx$/u, ".css"));

        const source = await fs.readFile(tsxPath, "utf8");
        const transpiled = transpileTsxToJsx(source, tsxPath);
        const finalJsx = injectCssImport(
            transpiled,
            `./${path.basename(cssPath)}`
        );

        await fs.mkdir(jsxDir, { recursive: true });
        await fs.writeFile(jsxPath, finalJsx, "utf8");

        await buildCss({
            componentName: componentDirName,
            tsxPath: path.relative(rootDir, tsxPath).replaceAll(path.sep, "/"),
            jsxPath: path.relative(rootDir, jsxPath).replaceAll(path.sep, "/"),
            cssPath,
        });
    }

    await fs.rm(tempDir, { recursive: true, force: true });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
