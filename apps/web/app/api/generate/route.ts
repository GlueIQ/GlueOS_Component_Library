import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { generateProject } from "./template-engine"

const generateSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  projectSlug: z
    .string()
    .min(1, "Project slug is required")
    .regex(
      /^[a-z][a-z0-9-]*$/,
      "Slug must start with a letter and contain only lowercase letters, numbers, and hyphens",
    ),
  palette: z.enum(["slate", "gray", "zinc", "neutral", "stone"]),
  chartPalette: z.enum([
    "red", "orange", "amber", "yellow", "lime", "green", "emerald",
    "teal", "cyan", "sky", "blue", "indigo", "violet", "purple",
    "fuchsia", "pink", "rose",
  ]).optional().default("pink"),
  brandColors: z.object({
    primary: z.string().optional(),
    secondary: z.string().optional(),
    accent: z.string().optional(),
  }),
  headingFont: z.string().min(1, "Heading font is required"),
  bodyFont: z.string().min(1, "Body font is required"),
  radius: z.string(),
  logos: z
    .object({
      icon: z.string().optional(),
      light: z.string().optional(),
      dark: z.string().optional(),
      favicon: z.string().optional(),
    })
    .optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = generateSchema.parse(body)

    const zipBuffer = await generateProject({
      clientName: data.clientName,
      projectSlug: data.projectSlug,
      neutralPalette: data.palette,
      chartPalette: data.chartPalette,
      brandColors: data.brandColors,
      headingFont: data.headingFont,
      bodyFont: data.bodyFont,
      radius: data.radius,
      logos: data.logos,
    })

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${data.projectSlug}-workspace.zip"`,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.issues },
        { status: 400 },
      )
    }

    console.error("Generation failed:", error)
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Generation failed",
      },
      { status: 500 },
    )
  }
}
