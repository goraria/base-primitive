// import { type ComponentProps, Fragment, type ReactNode } from "react"
// import type { Key } from "ts-key-enum"
// import { cn } from "cn"

// const DefaultKbdSeparator = ({ className, children = "+", ...props }: ComponentProps<"span">) => (
//   <span className={cn("text-muted-foreground/50", className)} {...(props as any)}>
//     {children}
//   </span>
// )

// export type KbdProps = ComponentProps<"span"> & {
//   separator?: ReactNode
// }

// export const Kbd = ({
//   className,
//   separator = <DefaultKbdSeparator />,
//   children,
//   ...props
// }: KbdProps) => (
//   <span
//     className={cn(
//       "inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 align-middle font-medium font-mono text-[10px] text-muted-foreground leading-loose",
//       className,
//     )}
//     {...(props as any)}
//   >
//     {Array.isArray(children)
//       ? children.map((child, index) => (
//           <Fragment key={index}>
//             {child}
//             {index < children.length - 1 && separator}
//           </Fragment>
//         ))
//       : children}
//   </span>
// )

// export type KbdKeyProps = Omit<ComponentProps<"kbd">, "aria-label"> & {
//   "aria-label"?: keyof typeof Key | (string & {})
// }

// export const KbdKey = ({ className, ...props }: KbdKeyProps) => <kbd {...(props as any)} />

// // Demo
// export function Demo() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="flex flex-col gap-6">
//         <div className="flex items-center justify-between gap-8">
//           <span className="text-sm text-muted-foreground">Command Palette</span>
//           <Kbd className="text-sm px-2 py-1">
//             <KbdKey>⌘</KbdKey>
//             <KbdKey>K</KbdKey>
//           </Kbd>
//         </div>
//         <div className="flex items-center justify-between gap-8">
//           <span className="text-sm text-muted-foreground">Quick Actions</span>
//           <Kbd className="text-sm px-2 py-1">
//             <KbdKey>Ctrl</KbdKey>
//             <KbdKey>Shift</KbdKey>
//             <KbdKey>P</KbdKey>
//           </Kbd>
//         </div>
//         <div className="flex items-center justify-between gap-8">
//           <span className="text-sm text-muted-foreground">Save</span>
//           <Kbd className="text-sm px-2 py-1">
//             <KbdKey>⌘</KbdKey>
//             <KbdKey>S</KbdKey>
//           </Kbd>
//         </div>
//         <div className="flex items-center justify-between gap-8">
//           <span className="text-sm text-muted-foreground">Undo</span>
//           <Kbd className="text-sm px-2 py-1">
//             <KbdKey>⌘</KbdKey>
//             <KbdKey>Z</KbdKey>
//           </Kbd>
//         </div>
//       </div>
//     </div>
//   )
// }
