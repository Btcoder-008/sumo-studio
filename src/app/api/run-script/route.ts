import { NextResponse } from "next/server";
import { exec } from "child_process";
import { writeFileSync, chmodSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

export async function POST(request: Request): Promise<Response> {
  try {
    const { scriptId, content, projectName, projectPath } = await request.json();

    // Validate inputs
    if (!projectName || !projectPath || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: projectName, projectPath, or content" },
        { status: 400 }
      );
    }

    // Create a temp script file with the content (placeholders already replaced by frontend)
    const tempPath = join(tmpdir(), `sumo-script-${scriptId}-${Date.now()}.sh`);
    writeFileSync(tempPath, content);
    chmodSync(tempPath, 0o755);

    // Command to run the script (no need to pipe project name - it's already in the script)
    const command = `bash "${tempPath}"`;

    // Open Terminal and run the script using osascript
    const appleScript = `tell application "Terminal"
      activate
      do script "${command.replace(/"/g, '\\"')}"
    end tell`;

    return new Promise<Response>((resolve) => {
      exec(`osascript -e '${appleScript}'`, (error) => {
        if (error) {
          console.error("Error:", error);
          resolve(
            NextResponse.json(
              { success: false, message: "Failed to open Terminal" },
              { status: 500 }
            )
          );
        } else {
          resolve(
            NextResponse.json({ success: true, message: "Terminal opened!" })
          );
        }
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to run script" },
      { status: 500 }
    );
  }
}
