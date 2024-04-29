"use client";

import supabase from "@/core/supabase/supabase-client";

export function copyTextToClipboard(text: string) {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

export function openNewTab(url: string) {
  if (window) {
    window.open(url, "_blank");
  }
}

export function getPublicUrl(bucketName: string, path: string) {
  if (!path) return null;
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
}
