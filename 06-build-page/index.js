const path = require('path');
const { createWriteStream } = require('fs');
const { rm, readdir, mkdir, copyFile, readFile, writeFile } = require('fs/promises');
const distFolderPath = path.join(__dirname, 'project-dist');


async function copyFiles(assets, destinationFolder) {
    try {
        const files = await readdir(assets, { withFileTypes: true });

        files.filter((file) => file.isFile()).forEach(({ name }) => {
            copyFile(path.join(assets, name), path.join(destinationFolder, name));
        });
    } catch (err) {
        console.log(err);
    }
}

async function copyFolder(assets, destinationFolder) {
    try {
        await mkdir(destinationFolder, { recursive: true });
        await copyFiles(assets, destinationFolder);
        const items = await readdir(assets, { withFileTypes: true });

        items.forEach((item) => {
        if (item.isDirectory()) {
            copyFolder(path.join(assets, item.name),path.join(destinationFolder, item.name));
        }
        })

    }catch (err) {
        console.log(err);
    }
}

async function createCssBundle(assetsPath, distPath, extension, encoding) {
    try {
        const outputStream = createWriteStream(distPath, encoding);
        const files = await readdir(assetsPath, { withFileTypes: true });
        const filesBundle = files.filter((file) => file.isFile()).filter(({ name }) => path.extname(name) === extension);
        for (const file of filesBundle) {
        const fileSource = await readFile(path.join(assetsPath, file.name), encoding);
        outputStream.write(`${fileSource}\n`);
        }

    }catch (err) {
        console.log(err);
    }
}

async function createHtmlBundle(template, htmlBundle, componentsFolder, componentsExtension) {
    try {
        const templateSource = await readFile(path.join(__dirname, template));
        let resultTemplateSource = templateSource.toString();
        const templateComponents = resultTemplateSource.match(/{{(.*)}}/gi);

        if (templateComponents) {
        for await (const component of templateComponents) {
            const componentName = `${component.replace('{{', '').replace('}}', '')}${componentsExtension}`;
            const componentSource = await readFile(path.join(__dirname, componentsFolder, componentName));
            resultTemplateSource = resultTemplateSource.replace(component, componentSource.toString());
        }
        await writeFile(htmlBundle, resultTemplateSource);
        }
    }catch (err) {
        console.log(err);
    }
}

async function createDist() {
    try {
        await rm(distFolderPath, { force: true, recursive: true });
        await mkdir(distFolderPath, { recursive: true });
        await copyFolder(path.join(__dirname, 'assets'),path.join(distFolderPath, 'assets'));
        await createCssBundle(path.join(__dirname, 'styles'),path.join(distFolderPath, 'style.css'),'.css','utf-8');
        await createHtmlBundle('template.html', path.join(distFolderPath, 'index.html'), 'components','.html');
    }catch (err) {
        console.log(err);
    }
}

createDist();