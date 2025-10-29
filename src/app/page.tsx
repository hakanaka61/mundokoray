"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { Chip } from "@/components/Chip";
import { Section } from "@/components/Section";
import { ItemPill } from "@/components/ItemPill";
import { RunePill } from "@/components/RunePill";

import { getMundoMatchup } from "@/lib/matchups";
import type { MundoMatchup } from "@/lib/types";

type ChampInfo = {
  id: string;
  name: string;
  title: string;
  icon: string; // full URL
};

// Riot'tan patch versiyonunu çek
async function fetchLatestVersion(): Promise<string> {
  try {
    const versions = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    ).then((r) => r.json());
    return versions?.[0] ?? "15.1.1";
  } catch {
    return "15.1.1";
  }
}

// Şampiyon listesini çek
async function fetchChampionList(version: string): Promise<ChampInfo[]> {
  const data = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  ).then((r) => r.json());

  const champsData = (data.data ?? {}) as Record<string, any>;
  const arr: ChampInfo[] = [];

  Object.values(champsData).forEach((c: any) => {
    arr.push({
      id: c.id,
      name: c.name,
      title: c.title,
      icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${c.image.full}`,
    });
  });

  // Dr. Mundo'yu üstte tut
  arr.sort((a, b) => {
    if (a.id === "DrMundo") return -1;
    if (b.id === "DrMundo") return 1;
    return a.name.localeCompare(b.name);
  });

  return arr;
}

// Difficulty -> chip görünümü
function getDifficultyChip(d: MundoMatchup["difficulty"]) {
  if (d === "TEHLIKELI") {
    return { label: "TEHLİKELİ", tone: "danger" as const };
  }
  if (d === "RAHAT") {
    return { label: "RAHAT", tone: "positive" as const };
  }
  return { label: "DENGELİ", tone: "default" as const };
}

// Skeleton kartı (şampiyon listesi yüklenirken)
function ChampSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-xl border p-2 bg-slate-900/40 border-slate-700 animate-pulse">
      <div className="w-7 h-7 rounded-full bg-slate-700" />
      <div className="w-16 h-3 rounded bg-slate-700" />
    </div>
  );
}

export default function Page() {
  // Riot versiyon + şamp listesi
  const [ddVersion, setDdVersion] = useState<string>("");
  const [champions, setChampions] = useState<ChampInfo[]>([]);
  const [loadingChamps, setLoadingChamps] = useState<boolean>(true);

  // Kullanıcının seçtiği rakip
  const [search, setSearch] = useState<string>(""); // arama kutusu
  const [enemy, setEnemy] = useState<string>("Gwen"); // default rakip

  // detay bölümüne scroll etmek için
  const detailRef = useRef<HTMLDivElement | null>(null);

  // ilk yüklemede Riot verilerini getir
  useEffect(() => {
    (async () => {
      setLoadingChamps(true);
      const v = await fetchLatestVersion();
      setDdVersion(v);
      const list = await fetchChampionList(v);
      setChampions(list);
      setLoadingChamps(false);
    })();
  }, []);

  // arama filtresi
  const filteredChamps = useMemo(() => {
    const q = search.toLowerCase();
    return champions.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
    );
  }, [champions, search]);

  // Mundo vs seçilen rakip datası
  const matchup: MundoMatchup = useMemo(() => {
    return getMundoMatchup(enemy);
  }, [enemy]);

  // rakip ikonunu bul (yoksa placeholder avatar)
  const enemyIcon =
    champions.find((c) => c.name === enemy)?.icon ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      enemy
    )}&background=0B1220&color=fff&rounded=true&size=64`;

  // Mundo ikonunu Riot'tan çek
  const mundoIcon = ddVersion
    ? `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/DrMundo.png`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        "Dr. Mundo"
      )}&background=0B1220&color=fff&rounded=true&size=64`;

  const diffChip = getDifficultyChip(matchup.difficulty);

  return (
    <main className="flex items-start justify-center w-full p-4 sm:p-6 md:p-10 bg-slate-900 text-slate-50 min-h-screen">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SOL PANEL */}
        <section className="rounded-3xl bg-slate-800/60 border border-slate-700 p-5 md:p-6 flex flex-col">
          <button
            className="text-slate-300 hover:text-slate-100 mb-4 text-sm self-start"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
          >
            ←
          </button>

          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Maç Rehberi
            </h1>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Benim Şampiyonum */}
              <div className="rounded-2xl bg-slate-800 border border-slate-700 p-4 flex flex-col items-center gap-2">
                <img
                  src={mundoIcon}
                  className="w-16 h-16 rounded-full object-cover"
                  alt="Dr. Mundo"
                />
                <div className="text-center">
                  <div className="text-slate-300 text-xs">
                    Benim Şampiyonum
                  </div>
                  <div className="text-lg font-semibold">Dr. Mundo</div>
                </div>
              </div>

              {/* Rakip Şampiyon */}
              <div className="rounded-2xl bg-slate-800 border border-slate-700 p-4">
                <div className="text-center text-slate-300 text-xs">
                  Rakip Şampiyon
                </div>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ara: Gwen, Darius..."
                  className="mt-2 w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <div className="mt-3 max-h-64 overflow-auto grid grid-cols-3 gap-2 text-left">
                  {loadingChamps &&
                    Array.from({ length: 6 }).map((_, i) => (
                      <ChampSkeleton key={i} />
                    ))}

                  {!loadingChamps &&
                    filteredChamps.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setEnemy(c.name);
                        }}
                        className={
                          "flex items-center gap-2 rounded-xl border p-2 transition text-left " +
                          (enemy === c.name
                            ? "bg-emerald-600/20 border-emerald-500"
                            : "bg-slate-900/40 border-slate-700 hover:border-slate-500")
                        }
                        title={c.title}
                      >
                        <img
                          src={c.icon}
                          className="w-7 h-7 rounded-full"
                          alt={c.name}
                        />
                        <span className="text-sm">{c.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky CTA */}
          <button
            className="mt-6 md:mt-6 w-full rounded-2xl bg-orange-600 hover:bg-orange-500 active:scale-[.99] text-white font-semibold py-3 tracking-wide md:static sticky bottom-0 left-0 right-0"
            onClick={() => {
              detailRef.current?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            🔥 ANALİZ ET
          </button>
        </section>

        {/* SAĞ PANEL */}
        <section
          ref={detailRef}
          className="rounded-3xl bg-slate-800/60 border border-slate-700 p-5 md:p-6 space-y-4"
        >
          <button
            className="text-slate-300 hover:text-slate-100 text-sm"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
          >
            ←
          </button>

          {/* Mundo vs Enemy header */}
          <div className="flex flex-wrap items-center gap-3">
            <img
              src={mundoIcon}
              className="w-10 h-10 rounded-full"
              alt="Dr. Mundo"
            />
            <div className="text-slate-200 font-semibold">Dr. Mundo</div>
            <div className="text-slate-400">▶</div>
            <img
              src={enemyIcon}
              className="w-10 h-10 rounded-full"
              alt={enemy}
            />
            <div className="text-slate-200 font-semibold">{enemy}</div>
          </div>

          {/* Zorluk / Winrate / Neden zor? */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone={diffChip.tone}>{diffChip.label}</Chip>

              {typeof matchup.winrateHint === "number" && (
                <Chip>
                  {`Winrate ipucu: ${matchup.winrateHint.toFixed(1)}%`}
                </Chip>
              )}
            </div>

            {matchup.difficultyReason && (
              <p className="text-sm text-slate-400 leading-snug">
                {matchup.difficultyReason}
              </p>
            )}
          </div>

          {/* Core Items */}
          <Section title="ÖNCE BUNU (Core Items)">
            <div className="grid gap-2 sm:grid-cols-2">
              {matchup.core_items.map((it, i) => (
                <ItemPill key={i} item={it} featured={i === 0} />
              ))}
            </div>

            {matchup.boots && (
              <div className="text-sm text-slate-300">
                👢 Ayakkabı: {matchup.boots}
              </div>
            )}
          </Section>

          {/* Rün Planı */}
          <Section title="RÜN PLANI">
            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-300 mb-1">
                  Birincil: {matchup.runes_primary.tree}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {matchup.runes_primary.keystone && (
                    <RunePill
                      name={`Keystone: ${matchup.runes_primary.keystone}`}
                    />
                  )}
                  {matchup.runes_primary.minor.map((m) => (
                    <RunePill key={m} name={m} />
                  ))}
                </div>
              </div>

              {matchup.runes_secondary && (
                <div>
                  <div className="text-sm text-slate-300 mb-1">
                    İkincil: {matchup.runes_secondary.tree}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchup.runes_secondary.minor.map((m) => (
                      <RunePill key={m} name={m} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* Early Plan */}
          <Section title="EARLY PLAN (Lane Notları)">
            <ul className="list-disc pl-5 space-y-1 text-slate-100/90">
              {matchup.early_plan.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </Section>

          <div className="text-xs text-slate-400">
            * Bu build sadece Dr. Mundo için özelleştirildi. Rakip için kayıt
            yoksa varsayılan tank build ve genel lane planı gösterilir.
            Güncellemeyi patch patch yapabiliriz.
          </div>
        </section>
      </div>
    </main>
  );
}
