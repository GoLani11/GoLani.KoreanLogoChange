import { DependencyContainer } from "tsyringe";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { VFS } from "@spt/utils/VFS";
import * as path from "path";

class LogoChangeMod implements IPreSptLoadMod {
    public preSptLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const preSptModLoader = container.resolve<PreSptModLoader>("PreSptModLoader");
        const vfs = container.resolve<VFS>("VFS");

        const modPath = preSptModLoader.getModPath("spt_logo_change");
        const sourceAssetPath = path.join(modPath, "res", "sharedassets178.assets");
        const targetAssetPath = "EscapeFromTarkov_Data/sharedassets178.assets";

        try {
            vfs.copyFile(sourceAssetPath, targetAssetPath);
            logger.info("LogoChangeMod: Asset file successfully overridden.");
        } catch (error) {
            logger.error(`LogoChangeMod: Failed to override asset file. Error: ${error}`);
        }
    }
}

module.exports = { mod: new LogoChangeMod() }