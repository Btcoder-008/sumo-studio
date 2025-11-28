import { NextResponse } from "next/server";

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

    // Return the script content for download (works on any platform)
    return NextResponse.json({
      success: true,
      message: "Script ready for download",
      script: content,
      filename: `${projectName}-setup.sh`,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate script" },
      { status: 500 }
    );
  }
}
