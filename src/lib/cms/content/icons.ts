import {
  Award, BarChart3, BookOpen, Bot, Briefcase, Building2, Calendar, CheckCircle2, Clock, Code, Code2, Cpu, Database, Factory,
  FileText, Filter, Globe, Headphones, Heart, Home, Layers, Lock, Mail, MapPin, MessageSquare, Palette, PenTool, Phone,
  Rocket, RotateCcw, Search, Server, Settings, Shield, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Star,
  Stethoscope, Target, TrendingUp, Users, Workflow, Zap,
  type LucideIcon,
} from "lucide-react";

/** Icons an editor can pick for CMS-driven cards and menus. */
export const CONTENT_ICONS: Record<string, LucideIcon> = {
  Award, BarChart3, BookOpen, Bot, Briefcase, Building2, Calendar, CheckCircle2, Clock, Code, Code2, Cpu, Database, Factory,
  FileText, Filter, Globe, Headphones, Heart, Home, Layers, Lock, Mail, MapPin, MessageSquare, Palette, PenTool, Phone,
  Rocket, RotateCcw, Search, Server, Settings, Shield, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Star,
  Stethoscope, Target, TrendingUp, Users, Workflow, Zap,
};

export const ICON_NAMES = Object.keys(CONTENT_ICONS);

export function contentIcon(name: string | undefined, fallback: LucideIcon = Sparkles): LucideIcon {
  return (name && CONTENT_ICONS[name]) || fallback;
}
