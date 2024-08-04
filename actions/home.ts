"use server";
import { NextApiRequest, NextApiResponse } from "next";
export interface VideoData {
  title: string;
  id: string;
  image: string;
  duration: string;
  views: string;
  rating: string;
  uploaded: string;
  upvoted: string;
  downvoted: string;
  models: string[];
  tags: string[];
}

// XVideos API response structure
export interface XVideosResponse {
  success: boolean;
  data: VideoData;
  source: string;
  assets: string[];
}

// YouPorn API response structure
export interface YouPornResponse {
  success: boolean;
  data: VideoData;
  source: string;
  assets: string[];
}
export async function getHome(): Promise<XVideosResponse | null> {
  try {
    const response = await fetch('https://lust.scathach.id/xvideos/random');
    if (!response.ok) {
      throw new Error(`Failed to fetch home data: ${response.statusText}`);
    }
    const data: XVideosResponse = await response.json();
    console.log('xvideosData:', data);
    return data || null;
  } catch (error) {
    console.error('Error fetching home data:', error);
    return null;
  }
}

export async function getImages(): Promise<YouPornResponse | null> {
  try {
    const response = await fetch('https://lust.scathach.id/youporn/random', { next: { revalidate: 60 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch images data: ${response.statusText}`);
    }
    const data: YouPornResponse = await response.json();
    console.log('youpornData:', data);
    return data || null;
  } catch (error) {
    console.error('Error fetching images data:', error);
    return null;
  }
}
