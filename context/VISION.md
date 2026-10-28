# FileWheel — Vision

> Maintained doc. Update it when the product direction changes, and log the change in
> [`DECISIONS.md`](DECISIONS.md).

## One sentence

FileWheel makes converting, compressing, and acting on files a single friction-free
gesture — drop a file on a wheel, pick a slice, done — entirely on the user's own machine.

## The problem

People constantly need to change files: a HEIC photo to JPG, a scanned PDF to text, a
MOV to MP4, a too-big image made smaller. Today they mostly do this by uploading private
files to ad-filled conversion websites that may store, cache, or leak their data. The
alternatives (command-line tools, bloated editors, OS-specific utilities) are either
intimidating or inconsistent across platforms.

## The solution

A desktop app that does these jobs **locally, instantly, and for free**, wrapped in a UX
so smooth the user's only job is: **drop → pick → done**. Everything else — finding the
right tool, downloading helpers, naming the output, revealing the result — is absorbed by
the app.

## Who it's for

- **Everyday users** who just want a file in a different format without uploading it.
- **Privacy-conscious people** who refuse to send documents to the cloud.
- **Power users** who want keyboard-driven, repeatable conversions.

## What makes it different

1. **100% local & private** — no account, no cloud, no telemetry. This is the core promise.
2. **The wheel** — a radial drop target that only shows options relevant to the dropped
   file. It's the signature interaction and the brand.
3. **Frictionless by obsession** — no dialogs, no "Save As", no settings walls. Smart
   defaults everywhere. Helper tools download silently in the background.
4. **One app, three OSes** — identical experience on macOS, Windows, and Linux.

## UX principles (non-negotiable)

These are the rules every feature is measured against. The product *is* the experience.

1. **Drop → pick → done.** Three steps, never four. The output is auto-named and saved
   next to the original by default.
2. **No blocking dialogs.** Progress and results appear inline. Tool downloads happen
   silently in the background with a small inline indicator — never a modal, never a
   trip to a website.
3. **Only show what's relevant.** The wheel adapts to the dropped file's type.
4. **Zero setup.** No onboarding wizard, no account, no configuration required to start.
   It works the moment it opens.
5. **Smart memory.** Recent and frequent actions surface first. "Repeat last" is one click.
6. **Calm visuals.** Neutral canvas, generous whitespace, one confident accent (Harbor
   blue). Light and dark from day one. Color means "this is actionable / this is happening."
7. **Trust is sacred.** Nothing leaves the machine without the user explicitly asking
   (e.g. the Share action). The privacy promise is never quietly broken.

## What success looks like

- A first-time user converts a file within ~10 seconds of opening the app, with no setup.
- People recommend it specifically because it's local/private and "just works."
- The experience feels noticeably smoother than any web converter or OS utility.

## Explicit non-goals (for now)

- Not a cloud service. No server, no sync, no accounts.
- Not an editor. We convert/compress/act on files; we don't edit their contents.
- Not a batch-automation powerhouse in v1 (that's later).
