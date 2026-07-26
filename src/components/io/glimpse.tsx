// "use client"
//
// import type { ComponentProps } from "react"
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
// import { cn } from "@/lib/utils"
//
// export type GlimpseProps = ComponentProps<typeof HoverCard>
//
// export const Glimpse = (props: GlimpseProps) => {
//   return <HoverCard {...(props as any)} />
// }
//
// export type GlimpseContentProps = ComponentProps<typeof HoverCardContent>
//
// export const GlimpseContent = (props: GlimpseContentProps) => (
//   <HoverCardContent {...(props as any)} />
// )
//
// export type GlimpseTriggerProps = ComponentProps<typeof HoverCardTrigger>
//
// export const GlimpseTrigger = (props: GlimpseTriggerProps) => (
//   <HoverCardTrigger {...(props as any)} />
// )
//
// export type GlimpseTitleProps = ComponentProps<"p">
//
// export const GlimpseTitle = ({ className, ...props }: GlimpseTitleProps) => {
//   return <p className={cn("truncate font-semibold text-sm", className)} {...(props as any)} />
// }
//
// export type GlimpseDescriptionProps = ComponentProps<"p">
//
// export const GlimpseDescription = ({ className, ...props }: GlimpseDescriptionProps) => {
//   return (
//     <p
//       className={cn("line-clamp-2 text-muted-foreground text-sm", className)}
//       {...(props as any)}
//     />
//   )
// }
//
// export type GlimpseImageProps = ComponentProps<"img">
//
// export const GlimpseImage = ({ className, alt, ...props }: GlimpseImageProps) => (
//   <img
//     alt={alt ?? ""}
//     className={cn("mb-4 aspect-[120/63] w-full rounded-md border object-cover", className)}
//     {...(props as any)}
//     height={400}
//     width={400}
//   />
// )
//
// // Demo
// export function Demo() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <p className="text-muted-foreground">
//         Check out the{" "}
//         <Glimpse openDelay={100} closeDelay={100}>
//           <GlimpseTrigger asChild>
//             <button
//               type="button"
//               className="inline text-primary font-medium underline underline-offset-4 hover:text-primary/80 cursor-pointer"
//             >
//               project documentation
//             </button>
//           </GlimpseTrigger>
//           <GlimpseContent className="w-80" side="top" sideOffset={8}>
//             <GlimpseImage
//               src="https://picsum.photos/seed/docs/400/200"
//               alt="Documentation preview"
//             />
//             <GlimpseTitle>Project Documentation</GlimpseTitle>
//             <GlimpseDescription>
//               Comprehensive guides, API references, and examples to help you get started quickly.
//             </GlimpseDescription>
//           </GlimpseContent>
//         </Glimpse>{" "}
//         for more details.
//       </p>
//     </div>
//   )
// }
