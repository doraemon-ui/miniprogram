"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const typescript_1 = __importDefault(require("typescript"));
exports.default = (ctx) => {
    const sourceRoot = ctx.paths.sourcePath;
    const dist = path_1.default.join(ctx.paths.outputPath);
    const resolveScopeDir = () => {
        const candidates = [
            path_1.default.resolve(ctx.paths.nodeModulesPath, '@doraemon-ui'),
            path_1.default.resolve(process.cwd(), 'node_modules/@doraemon-ui'),
            path_1.default.resolve(process.cwd(), '../node_modules/@doraemon-ui'),
            path_1.default.resolve(process.cwd(), '../../node_modules/@doraemon-ui'),
        ];
        for (const candidate of candidates) {
            if (fs_extra_1.default.existsSync(candidate))
                return candidate;
        }
        return candidates[0];
    };
    const scopeDir = resolveScopeDir();
    const targetScopeDir = path_1.default.join(dist, 'miniprogram_npm/@doraemon-ui');
    const excludePackages = new Set(['cli', 'tools', 'taro-react']);
    const debug = process.env.DORAEMON_DEBUG === '1';
    const toKebab = (name) => name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase();
    const readJsonIfExistsSync = (filePath) => {
        if (!fs_extra_1.default.existsSync(filePath))
            return null;
        try {
            return fs_extra_1.default.readJSONSync(filePath);
        }
        catch {
            return null;
        }
    };
    const findUpwardFile = (startDir, fileName) => {
        let currentDir = path_1.default.resolve(startDir);
        while (true) {
            const candidate = path_1.default.join(currentDir, fileName);
            if (fs_extra_1.default.existsSync(candidate))
                return candidate;
            const parentDir = path_1.default.dirname(currentDir);
            if (parentDir === currentDir)
                return null;
            currentDir = parentDir;
        }
    };
    const getPkgDepsSync = () => {
        const upwardFromCwd = findUpwardFile(process.cwd(), 'miniprogram.pkg-deps.json');
        const upwardFromPlugin = findUpwardFile(__dirname, 'miniprogram.pkg-deps.json');
        const candidatePaths = [
            path_1.default.resolve(process.cwd(), 'miniprogram.pkg-deps.json'),
            path_1.default.resolve(process.cwd(), '../miniprogram.pkg-deps.json'),
            path_1.default.resolve(process.cwd(), '../../miniprogram.pkg-deps.json'),
            path_1.default.resolve(process.cwd(), '../../../miniprogram.pkg-deps.json'),
            path_1.default.resolve(__dirname, '../miniprogram.pkg-deps.json'),
            path_1.default.resolve(__dirname, '../../miniprogram.pkg-deps.json'),
            path_1.default.resolve(__dirname, '../../../miniprogram.pkg-deps.json'),
            upwardFromCwd,
            upwardFromPlugin,
        ].filter(Boolean);
        for (const filePath of candidatePaths) {
            const json = readJsonIfExistsSync(filePath);
            if (json && typeof json === 'object') {
                if (debug)
                    console.log('[doraemon-taro-react-plugin] pkg-deps:', filePath);
                return json;
            }
        }
        if (debug)
            console.log('[doraemon-taro-react-plugin] pkg-deps: not found');
        return {};
    };
    const buildRefs = (pkgDeps) => {
        const dirToRef = new Map();
        const nameToDir = new Map();
        const packageToComponents = new Map();
        Object.entries(pkgDeps).forEach(([pkgName, pkgMeta]) => {
            const components = pkgMeta?.components || {};
            packageToComponents.set(pkgName, components);
            Object.entries(components).forEach(([componentKey, meta]) => {
                if (!meta || !meta.dir || !meta.src)
                    return;
                dirToRef.set(meta.dir, { packageName: pkgName, componentKey, meta });
                if (meta.name)
                    nameToDir.set(meta.name, meta.dir);
            });
        });
        return { dirToRef, nameToDir, packageToComponents };
    };
    const collectUsedComponentDirsSync = (nameToDir) => {
        const usedDirs = new Set();
        const sourceFiles = fast_glob_1.default.sync(`${sourceRoot}/**/*.{js,jsx,ts,tsx}`, {
            ignore: ['**/node_modules/**', '**/dist/**'],
        });
        for (const filePath of sourceFiles) {
            const code = fs_extra_1.default.readFileSync(filePath, 'utf8');
            const scriptKind = filePath.endsWith('.tsx')
                ? typescript_1.default.ScriptKind.TSX
                : filePath.endsWith('.ts')
                    ? typescript_1.default.ScriptKind.TS
                    : filePath.endsWith('.jsx')
                        ? typescript_1.default.ScriptKind.JSX
                        : typescript_1.default.ScriptKind.JS;
            const sourceFile = typescript_1.default.createSourceFile(filePath, code, typescript_1.default.ScriptTarget.Latest, true, scriptKind);
            const localNameToDirs = new Map();
            const localNames = new Set();
            const addLocal = (localName, dir) => {
                if (!localName || !dir)
                    return;
                const existing = localNameToDirs.get(localName) || new Set();
                existing.add(dir);
                localNameToDirs.set(localName, existing);
                localNames.add(localName);
            };
            sourceFile.forEachChild((node) => {
                if (!typescript_1.default.isImportDeclaration(node))
                    return;
                const importPath = typescript_1.default.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : '';
                const importClause = node.importClause;
                if (!importClause)
                    return;
                if (importPath === '@doraemon-ui/taro-react') {
                    if (importClause.namedBindings && typescript_1.default.isNamedImports(importClause.namedBindings)) {
                        importClause.namedBindings.elements.forEach((spec) => {
                            if (spec.isTypeOnly)
                                return;
                            const importedName = spec.propertyName?.text || spec.name.text;
                            const localName = spec.name.text;
                            const dir = nameToDir.get(importedName);
                            if (dir)
                                addLocal(localName, dir);
                        });
                    }
                    return;
                }
                const subpathMatch = importPath.match(/^@doraemon-ui\/taro-react\/components\/([a-z0-9-]+)$/);
                if (!subpathMatch)
                    return;
                const dir = subpathMatch[1];
                if (importClause.name)
                    addLocal(importClause.name.text, dir);
                if (importClause.namedBindings && typescript_1.default.isNamedImports(importClause.namedBindings)) {
                    importClause.namedBindings.elements.forEach((spec) => {
                        if (spec.isTypeOnly)
                            return;
                        addLocal(spec.name.text, dir);
                    });
                }
            });
            if (localNames.size === 0)
                continue;
            const isImportIdentifier = (node) => {
                let current = node;
                while (current) {
                    if (typescript_1.default.isImportClause(current) ||
                        typescript_1.default.isImportSpecifier(current) ||
                        typescript_1.default.isImportDeclaration(current) ||
                        typescript_1.default.isNamespaceImport(current)) {
                        return true;
                    }
                    if (typescript_1.default.isSourceFile(current))
                        return false;
                    current = current.parent;
                }
                return false;
            };
            const visit = (node) => {
                if (typescript_1.default.isIdentifier(node) && localNames.has(node.text) && !isImportIdentifier(node)) {
                    const dirs = localNameToDirs.get(node.text);
                    dirs?.forEach((dir) => usedDirs.add(dir));
                }
                typescript_1.default.forEachChild(node, visit);
            };
            visit(sourceFile);
        }
        return usedDirs;
    };
    const resolveDependencies = (initialDirs, dirToRef, packageToComponents) => {
        const resolved = new Set(initialDirs);
        const queue = [...initialDirs];
        const findSelfDepDir = (packageName, depName) => {
            const components = packageToComponents.get(packageName);
            if (!components)
                return null;
            if (components[depName]?.dir)
                return components[depName].dir;
            const matched = Object.entries(components).find(([key, meta]) => key === depName || meta.dir === depName || meta.src === depName);
            return matched ? matched[1].dir : null;
        };
        while (queue.length > 0) {
            const currentDir = queue.shift();
            const currentRef = dirToRef.get(currentDir);
            if (!currentRef)
                continue;
            const deps = Array.isArray(currentRef.meta.deps) ? currentRef.meta.deps : [];
            for (const dep of deps) {
                let nextDir = null;
                if (dep.source === 'self') {
                    nextDir = findSelfDepDir(currentRef.packageName, dep.name);
                }
                else {
                    nextDir = dirToRef.get(dep.name)?.meta.dir || null;
                }
                if (!nextDir || resolved.has(nextDir))
                    continue;
                resolved.add(nextDir);
                queue.push(nextDir);
            }
        }
        return resolved;
    };
    const collectFallbackUsingComponentsSync = () => {
        const fallbackUsingComponents = {};
        if (!fs_extra_1.default.existsSync(scopeDir))
            return fallbackUsingComponents;
        const packages = fs_extra_1.default.readdirSync(scopeDir);
        for (const pkg of packages) {
            if (excludePackages.has(pkg))
                continue;
            if (!pkg.startsWith('miniprogram.'))
                continue;
            const pkgDir = path_1.default.join(scopeDir, pkg);
            if (!fs_extra_1.default.existsSync(pkgDir) || !fs_extra_1.default.statSync(pkgDir).isDirectory())
                continue;
            const miniprogramDistDir = path_1.default.join(pkgDir, 'miniprogram_dist');
            if (!fs_extra_1.default.existsSync(miniprogramDistDir))
                continue;
            const packageShortName = pkg.slice('miniprogram.'.length);
            const componentJsonFiles = fast_glob_1.default.sync(`${miniprogramDistDir}/*.json`);
            for (const componentJsonPath of componentJsonFiles) {
                const componentJson = readJsonIfExistsSync(componentJsonPath);
                if (!componentJson?.component)
                    continue;
                const fileName = path_1.default.basename(componentJsonPath, '.json');
                const suffix = fileName === 'index' ? '' : `-${toKebab(fileName)}`;
                const componentTag = `dora-${packageShortName}${suffix}`;
                fallbackUsingComponents[componentTag] = `/miniprogram_npm/@doraemon-ui/${pkg}/${fileName}`;
            }
        }
        return fallbackUsingComponents;
    };
    const copyPackageDist = async (packageName) => {
        const fullPkgName = packageName === 'style' ? 'style' : `miniprogram.${packageName}`;
        const pkgDir = path_1.default.join(scopeDir, fullPkgName);
        if (!(await fs_extra_1.default.pathExists(pkgDir)))
            return false;
        const stat = await fs_extra_1.default.stat(pkgDir);
        if (!stat.isDirectory())
            return false;
        const miniprogramDistDir = path_1.default.join(pkgDir, 'miniprogram_dist');
        if (!(await fs_extra_1.default.pathExists(miniprogramDistDir)))
            return false;
        await fs_extra_1.default.copy(miniprogramDistDir, path_1.default.join(targetScopeDir, fullPkgName));
        return true;
    };
    const resolvePackageLevelDeps = (basePackages) => {
        const resolved = new Set(basePackages);
        const queue = [...basePackages];
        const miniprogramPrefix = '@doraemon-ui/miniprogram.';
        const parseDepToPackage = (depName) => {
            if (depName.startsWith(miniprogramPrefix)) {
                return depName.slice(miniprogramPrefix.length);
            }
            if (depName === '@doraemon-ui/style') {
                return 'style';
            }
            return null;
        };
        while (queue.length > 0) {
            const current = queue.shift();
            const dirName = current === 'style' ? 'style' : `miniprogram.${current}`;
            const pkgJsonPath = path_1.default.join(scopeDir, dirName, 'package.json');
            const pkgJson = readJsonIfExistsSync(pkgJsonPath);
            if (!pkgJson || typeof pkgJson !== 'object')
                continue;
            const dependencies = {
                ...(pkgJson.dependencies || {}),
                ...(pkgJson.peerDependencies || {}),
                ...(pkgJson.optionalDependencies || {}),
            };
            Object.keys(dependencies).forEach((depName) => {
                const depPkg = parseDepToPackage(depName);
                if (!depPkg || resolved.has(depPkg))
                    return;
                const depDir = depPkg === 'style' ? 'style' : `miniprogram.${depPkg}`;
                if (!fs_extra_1.default.existsSync(path_1.default.join(scopeDir, depDir)))
                    return;
                resolved.add(depPkg);
                queue.push(depPkg);
            });
        }
        return resolved;
    };
    const sourceInjectStart = '/* doraemon-taro-react-plugin:start */';
    const sourceInjectEnd = '/* doraemon-taro-react-plugin:end */';
    const sourceInjectWrapStart = '/* doraemon-taro-react-plugin:wrap-start */';
    const sourceInjectWrapEnd = '/* doraemon-taro-react-plugin:wrap-end */';
    const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let appConfigBackup = null;
    const findAppConfigSourceFile = () => {
        const candidates = ['app.config.ts', 'app.config.js', 'app.config.tsx', 'app.config.jsx'];
        for (const fileName of candidates) {
            const filePath = path_1.default.join(sourceRoot, fileName);
            if (fs_extra_1.default.existsSync(filePath))
                return filePath;
        }
        return null;
    };
    const buildSourceUsingComponentsBlock = (map) => {
        const entries = Object.entries(map)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([name, componentPath]) => `    '${name}': '${componentPath}',`)
            .join('\n');
        return entries ? `  ${sourceInjectStart}\n${entries}\n  ${sourceInjectEnd}\n` : '';
    };
    const buildSourceUsingComponentsWrapperBlock = (map) => {
        const entriesBlock = buildSourceUsingComponentsBlock(map);
        if (!entriesBlock)
            return '';
        return `  ${sourceInjectWrapStart}\n  usingComponents: {\n${entriesBlock}  },\n  ${sourceInjectWrapEnd}\n`;
    };
    const injectSourceAppConfig = async () => {
        if (appConfigBackup)
            return;
        if (!usingComponentsToInject || Object.keys(usingComponentsToInject).length === 0)
            return;
        const appConfigPath = findAppConfigSourceFile();
        if (!appConfigPath)
            return;
        const source = await fs_extra_1.default.readFile(appConfigPath, 'utf8');
        appConfigBackup = { path: appConfigPath, content: source };
        const baseMap = { ...usingComponentsToInject };
        const entryMarkerRE = new RegExp(`\\n?[ \\t]*${escapeRegExp(sourceInjectStart)}[\\s\\S]*?${escapeRegExp(sourceInjectEnd)}\\n?`, 'm');
        const wrapperMarkerRE = new RegExp(`\\n?[ \\t]*${escapeRegExp(sourceInjectWrapStart)}[\\s\\S]*?${escapeRegExp(sourceInjectWrapEnd)}\\n?`, 'm');
        const cleaned = source
            .replace(wrapperMarkerRE, '')
            .replace(entryMarkerRE, '');
        let next = cleaned;
        {
            const scriptKind = appConfigPath.endsWith('.tsx') ? typescript_1.default.ScriptKind.TSX :
                appConfigPath.endsWith('.ts') ? typescript_1.default.ScriptKind.TS :
                    appConfigPath.endsWith('.jsx') ? typescript_1.default.ScriptKind.JSX :
                        typescript_1.default.ScriptKind.JS;
            const sourceFile = typescript_1.default.createSourceFile(appConfigPath, next, typescript_1.default.ScriptTarget.Latest, true, scriptKind);
            let configObject = null;
            const findConfigObject = (node) => {
                if (typescript_1.default.isCallExpression(node)
                    && node.arguments.length > 0
                    && typescript_1.default.isObjectLiteralExpression(node.arguments[0])) {
                    const exprText = node.expression.getText(sourceFile);
                    if (exprText === 'defineAppConfig' || exprText.endsWith('.defineAppConfig')) {
                        configObject = node.arguments[0];
                        return;
                    }
                }
                typescript_1.default.forEachChild(node, findConfigObject);
            };
            findConfigObject(sourceFile);
            if (!configObject)
                return;
            const usingProperty = configObject.properties.find((prop) => typescript_1.default.isPropertyAssignment(prop)
                && ((typescript_1.default.isIdentifier(prop.name) && prop.name.text === 'usingComponents')
                    || (typescript_1.default.isStringLiteral(prop.name) && prop.name.text === 'usingComponents'))
                && typescript_1.default.isObjectLiteralExpression(prop.initializer));
            if (usingProperty && typescript_1.default.isObjectLiteralExpression(usingProperty.initializer)) {
                const existingKeys = new Set();
                usingProperty.initializer.properties.forEach((prop) => {
                    if (!typescript_1.default.isPropertyAssignment(prop))
                        return;
                    if (typescript_1.default.isIdentifier(prop.name))
                        existingKeys.add(prop.name.text);
                    if (typescript_1.default.isStringLiteral(prop.name))
                        existingKeys.add(prop.name.text);
                });
                existingKeys.forEach((key) => {
                    delete baseMap[key];
                });
                const block = buildSourceUsingComponentsBlock(baseMap);
                if (!block)
                    return;
                const closeBraceIndex = usingProperty.initializer.end - 1;
                const beforeClose = next.slice(0, closeBraceIndex);
                const prefix = /\n[ \t]*$/.test(beforeClose) ? '' : '\n';
                next = `${beforeClose}${prefix}${block}${next.slice(closeBraceIndex)}`;
            }
            else {
                const block = buildSourceUsingComponentsWrapperBlock(baseMap);
                if (!block)
                    return;
                const closeBraceIndex = configObject.end - 1;
                const beforeClose = next.slice(0, closeBraceIndex);
                const prefix = /\n[ \t]*$/.test(beforeClose) ? '' : '\n';
                next = `${beforeClose}${prefix}${block}${next.slice(closeBraceIndex)}`;
            }
        }
        if (next !== source) {
            await fs_extra_1.default.writeFile(appConfigPath, next, 'utf8');
            if (debug)
                console.log('[doraemon-taro-react-plugin] source app.config injected');
        }
    };
    const restoreSourceAppConfig = async () => {
        if (appConfigBackup) {
            const { path: filePath, content } = appConfigBackup;
            appConfigBackup = null;
            if (!(await fs_extra_1.default.pathExists(filePath)))
                return;
            await fs_extra_1.default.writeFile(filePath, content, 'utf8');
            if (debug)
                console.log('[doraemon-taro-react-plugin] source app.config restored');
            return;
        }
        const filePath = findAppConfigSourceFile();
        if (!filePath)
            return;
        if (!(await fs_extra_1.default.pathExists(filePath)))
            return;
        const source = await fs_extra_1.default.readFile(filePath, 'utf8');
        const entryMarkerRE = new RegExp(`\\n?[ \\t]*${escapeRegExp(sourceInjectStart)}[\\s\\S]*?${escapeRegExp(sourceInjectEnd)}\\n?`, 'm');
        const wrapperMarkerRE = new RegExp(`\\n?[ \\t]*${escapeRegExp(sourceInjectWrapStart)}[\\s\\S]*?${escapeRegExp(sourceInjectWrapEnd)}\\n?`, 'm');
        const restored = source
            .replace(wrapperMarkerRE, '')
            .replace(entryMarkerRE, '');
        if (restored !== source) {
            await fs_extra_1.default.writeFile(filePath, restored, 'utf8');
            if (debug)
                console.log('[doraemon-taro-react-plugin] source app.config restored');
        }
    };
    let usingComponentsToInject = {};
    let packagesToCopy = new Set();
    let prepared = false;
    let copiedBeforeBuild = false;
    const prepare = () => {
        if (prepared)
            return;
        prepared = true;
        const pkgDeps = getPkgDepsSync();
        const hasPkgDeps = Object.keys(pkgDeps).length > 0;
        if (hasPkgDeps) {
            const { dirToRef, nameToDir, packageToComponents } = buildRefs(pkgDeps);
            const usedDirs = collectUsedComponentDirsSync(nameToDir);
            const resolvedDirs = resolveDependencies(usedDirs, dirToRef, packageToComponents);
            const map = {};
            const packageSet = new Set();
            resolvedDirs.forEach((dir) => {
                const ref = dirToRef.get(dir);
                if (!ref)
                    return;
                packageSet.add(ref.packageName);
                map[`dora-${dir}`] = `/miniprogram_npm/@doraemon-ui/miniprogram.${ref.packageName}/${ref.meta.src}`;
            });
            if (Object.keys(map).length > 0) {
                usingComponentsToInject = map;
                packagesToCopy = resolvePackageLevelDeps(packageSet);
                if (debug) {
                    console.log('[doraemon-taro-react-plugin] mode=deps', `inject=${Object.keys(map).length}`, `packages=${packagesToCopy.size}`);
                }
                return;
            }
        }
        usingComponentsToInject = collectFallbackUsingComponentsSync();
        packagesToCopy = new Set();
        if (debug) {
            console.log('[doraemon-taro-react-plugin] mode=fallback', `inject=${Object.keys(usingComponentsToInject).length}`);
        }
    };
    ctx.onBuildStart(async () => {
        if (copiedBeforeBuild)
            return;
        copiedBeforeBuild = true;
        prepare();
        await injectSourceAppConfig();
        if (debug) {
            console.log('[doraemon-taro-react-plugin] onBuildStart', `packagesToCopy=${packagesToCopy.size}`);
        }
        if (packagesToCopy.size > 0) {
            for (const packageName of packagesToCopy) {
                await copyPackageDist(packageName);
            }
            return;
        }
        if (!(await fs_extra_1.default.pathExists(scopeDir)))
            return;
        const packages = await fs_extra_1.default.readdir(scopeDir);
        for (const pkg of packages) {
            if (excludePackages.has(pkg))
                continue;
            if (!pkg.startsWith('miniprogram.') && pkg !== 'style')
                continue;
            const pkgDir = path_1.default.join(scopeDir, pkg);
            const stat = await fs_extra_1.default.stat(pkgDir);
            if (!stat.isDirectory())
                continue;
            const miniprogramDistDir = path_1.default.join(pkgDir, 'miniprogram_dist');
            if (!(await fs_extra_1.default.pathExists(miniprogramDistDir)))
                continue;
            await fs_extra_1.default.copy(miniprogramDistDir, path_1.default.join(targetScopeDir, pkg));
        }
    });
    ctx.onBuildComplete(async () => {
        try {
            prepare();
            if (debug) {
                console.log('[doraemon-taro-react-plugin] onBuildComplete', `packagesToCopy=${packagesToCopy.size}`);
            }
            if (packagesToCopy.size > 0) {
                for (const packageName of packagesToCopy) {
                    await copyPackageDist(packageName);
                }
                return;
            }
            // Fallback: copy all doraemon miniprogram packages
            if (!(await fs_extra_1.default.pathExists(scopeDir)))
                return;
            const packages = await fs_extra_1.default.readdir(scopeDir);
            for (const pkg of packages) {
                if (excludePackages.has(pkg))
                    continue;
                if (!pkg.startsWith('miniprogram.') && pkg !== 'style')
                    continue;
                const pkgDir = path_1.default.join(scopeDir, pkg);
                const stat = await fs_extra_1.default.stat(pkgDir);
                if (!stat.isDirectory())
                    continue;
                const miniprogramDistDir = path_1.default.join(pkgDir, 'miniprogram_dist');
                if (!(await fs_extra_1.default.pathExists(miniprogramDistDir)))
                    continue;
                await fs_extra_1.default.copy(miniprogramDistDir, path_1.default.join(targetScopeDir, pkg));
            }
        }
        finally {
            await restoreSourceAppConfig();
        }
    });
};
