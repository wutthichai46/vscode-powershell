// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import fs = require("fs");
import os = require("os");
import path = require("path");
import utils = require("../utils");
import vscode = require("vscode");
import { sleep } from "../../src/utils";

describe("Extension Terminal feature", function () {
    let terminal: vscode.Terminal;
    const testFile = path.join(os.tmpdir(), "ExtensionTerminalTests.log")

    before(async function () {
        const extension = await utils.ensureExtensionIsActivated();
        terminal = extension.getExtensionTerminal();
        terminal.show(true);
        sleep(1000);
    });

    beforeEach(function () {
        if (fs.existsSync(testFile)) {
            fs.rmSync(testFile);
        }
        assert.strictEqual(false, fs.existsSync(testFile));
    })

    it("Can run code in the terminal", async function () {
        const script = `Write-Output 'hi' >> '${testFile}'`;
        terminal.sendText(script);
        sleep(1000);
        assert.strictEqual(fs.readFileSync(testFile), "hi");
    });
});
