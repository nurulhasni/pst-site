"use client";

import Link from "next/link";
import { Calendar, ChevronRight, Clock, Link as LinkIcon, MessageCircle } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";
import { coverImage, idBodies, localPost, relatedImages, type Post } from "@/lib/blog";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const relatedDescriptions: Record<string, { en: string; id: string }> = {
  "why-sap-s4hana-matters-for-modern-enterprises": {
    en: "The critical advantages of moving to SAP S/4HANA.",
    id: "Keunggulan penting beralih ke SAP S/4HANA.",
  },
  "the-future-of-cloud-erp-solutions": {
    en: "How cloud-based ERP is changing resource management.",
    id: "Bagaimana ERP berbasis cloud mengubah pengelolaan sumber daya.",
  },
  "5-ways-to-optimize-your-business-processes": {
    en: "Practical strategies to find bottlenecks and streamline operations.",
    id: "Strategi praktis menemukan hambatan dan menyederhanakan operasional.",
  },
};

const copy = {
  en: {
    home: "Home",
    blog: "Blog",
    team: "PST Team",
    shareLabel: "SHARE THIS ARTICLE",
    onThisPage: "ON THIS PAGE",
    planTitle: "Planning your SAP journey?",
    planDesc: "Talk to our team about SAP solutions, support and RISE with SAP.",
    contactUs: "Contact us",
    related: "Related articles",
    viewAll: "View all articles",
    readMore: "Read more",
    leaveComment: "Leave a comment",
    commentNote: "Your email will not be published. Comments are reviewed before they appear.",
    name: "Name",
    namePh: "Your name",
    nameHelper: "We'll only use this to contact you about SAP.",
    email: "Email",
    emailPh: "your@email.com",
    comment: "Comment",
    commentPh: "Write your comment...",
    post: "Post comment",
    commentCount: "2 comments",
    comments: [
      {
        initials: "RW",
        name: "Rina Wijaya",
        ago: "2 days ago",
        text: "Great insights on digital transformation! The section on intelligent automation really resonated with our current initiatives.",
      },
      {
        initials: "AF",
        name: "Ahmad Fauzi",
        ago: "5 days ago",
        text: "Very well written. I appreciated the practical points on cloud-first ERP strategies — looking forward to more content like this!",
      },
    ],
    authorDesc: "Insights from the consultants behind PST's SAP implementations, support and business process work.",
    onThisPageItems: [
      "The rise of intelligent automation",
      "Cloud-first ERP strategies",
      "Data-driven decision making",
      "Preparing for the future",
    ],
  },
  id: {
    home: "Beranda",
    blog: "Blog",
    team: "Tim PST",
    shareLabel: "BAGIKAN ARTIKEL INI",
    onThisPage: "DI HALAMAN INI",
    planTitle: "Merencanakan perjalanan SAP Anda?",
    planDesc: "Bicarakan solusi SAP, dukungan, dan RISE with SAP dengan tim kami.",
    contactUs: "Hubungi kami",
    related: "Artikel terkait",
    viewAll: "Lihat semua artikel",
    readMore: "Baca selengkapnya",
    leaveComment: "Tinggalkan komentar",
    commentNote: "Email Anda tidak akan dipublikasikan. Komentar ditinjau sebelum ditampilkan.",
    name: "Nama",
    namePh: "Nama Anda",
    nameHelper: "Kami hanya menggunakan ini untuk menghubungi Anda tentang SAP.",
    email: "Email",
    emailPh: "email@anda.com",
    comment: "Komentar",
    commentPh: "Tulis komentar Anda...",
    post: "Kirim komentar",
    commentCount: "2 komentar",
    comments: [
      {
        initials: "RW",
        name: "Rina Wijaya",
        ago: "2 hari lalu",
        text: "Wawasan yang luar biasa tentang transformasi digital! Bagian tentang otomasi cerdas sangat relevan dengan inisiatif kami saat ini.",
      },
      {
        initials: "AF",
        name: "Ahmad Fauzi",
        ago: "5 hari lalu",
        text: "Tulisannya sangat baik. Saya menghargai poin praktis tentang strategi ERP berbasis cloud — nantikan konten seperti ini!",
      },
    ],
    authorDesc: "Wawasan dari para konsultan di balik implementasi SAP, dukungan, dan pekerjaan proses bisnis PST.",
    onThisPageItems: [
      "The rise of intelligent automation",
      "Cloud-first ERP strategies",
      "Data-driven decision making",
      "Preparing for the future",
    ],
  },
};

type RelatedPost = Pick<Post, "slug" | "title" | "category">;

export function BlogDetailView({ post: rawPost, locked, related }: { post: Post; locked: boolean; related: RelatedPost[] }) {
  const { lang, t } = useLanguage();
  const c = copy[lang];
  const post = localPost(rawPost, lang);
  const articlePost = { ...post, body: lang === "id" && idBodies[post.slug] ? idBodies[post.slug] : post.body };
  const localRelated = related.map((item) => localPost(item, lang));
  const headline = post.slug === "digital-transformation-trends-this-year" ? post.title.replace(" trends", "\ntrends") : post.title;
  const toc = (articlePost.body ?? []).flatMap((block) => (block.type === "h2" ? [block.text] : []));

  return (
    <main className="w-full overflow-x-hidden">
      <section className="box-border w-full h-fit flex flex-col gap-[24px] p-[56px_96px_72px_96px] justify-start items-start bg-[#08174A] [background-image:linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] max-lg:p-[40px_20px_48px_20px]">
        <div className={`box-border w-fit h-fit flex flex-row gap-[8px] items-center text-[14px]/[18px] ${font}`}>
          <Link href="/" className="text-[#FFFFFFA6] hover:text-[#FFFFFF]">{c.home}</Link>
          <span className="text-[#FFFFFF66]">/</span>
          <Link href="/blog" className="text-[#FFFFFFA6] hover:text-[#FFFFFF]">{c.blog}</Link>
        </div>
        <span className={`box-border w-fit h-[24px] p-[4px_10px] flex items-center bg-[#A6CBD3] rounded-[999px] text-[12px]/[16px] text-[#000354] ${font} font-medium`}>
          {t(`blog.cat.${post.category}`)}
        </span>
        <h1 className={`text-[56px]/[59px] box-border w-full max-w-[640px] text-[#FFFFFF] ${font} font-bold whitespace-pre-line max-lg:text-[40px]/[44px]`}>
          {headline}
        </h1>
        <div className={`box-border w-fit h-fit flex flex-row flex-wrap gap-[20px] items-center ${font}`}>
          <div className="box-border w-fit h-[36px] flex flex-row gap-[10px] items-center">
            <div className="box-border w-[36px] h-[36px] shrink-0 rounded-[999px] bg-[#FFFFFF] bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
            <span className="text-[15px]/[20px] text-[#FFFFFF] font-medium">{c.team}</span>
          </div>
          <span className="flex flex-row gap-[6px] items-center text-[14px]/[18px] text-[#FFFFFFBF]">
            <Calendar size={16} className="text-[#FFFFFFA6]" />
            {post.date}
          </span>
          <span className="flex flex-row gap-[6px] items-center text-[14px]/[18px] text-[#FFFFFFBF]">
            <Clock size={16} className="text-[#FFFFFFA6]" />
            {post.readTime}
          </span>
        </div>
      </section>

      <section className="box-border w-full h-fit flex flex-col p-[56px_96px_0px_96px] justify-start items-start max-lg:p-[32px_20px_0px_20px]">
        <div
          className="box-border w-full h-[520px] bg-cover bg-center rounded-[12px] max-lg:h-[260px]"
          style={{ backgroundImage: `url(${coverImage})` }}
          role="img"
          aria-label={post.title}
        />
      </section>

      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[104px] p-[64px_96px_96px_96px] justify-start items-start max-lg:p-[40px_20px_60px_20px] max-lg:gap-[40px]">
        <div className="box-border [flex:1_1_0] min-w-[300px] max-w-[804px] h-fit flex flex-col gap-[24px]">
          <ArticleBody post={articlePost} locked={locked} />
          {!locked && post.tags && (
            <div className="box-border w-full pt-[24px] flex flex-row flex-wrap gap-[8px]">
              {post.tags.map((tag) => (
                <span key={tag} className={`box-border w-fit h-[29px] p-[6px_14px] flex items-center [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[999px] text-[13px]/[17px] text-[#354A5F] ${font} font-medium`}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          {!locked && post.tags && (
            <div className="box-border w-full h-fit flex flex-row gap-[20px] p-[28px] bg-[#F5F6F7] rounded-[12px] items-start">
              <div className="box-border w-[64px] h-[64px] shrink-0 rounded-[999px] bg-[#FFFFFF] bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
              <div className="box-border w-full flex flex-col gap-[4px]">
                <div className={`text-[18px]/[24px] text-[#000000] ${font} font-medium`}>{c.team}</div>
                <div className={`text-[12px]/[16px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>PT PRIMA SISTEM TERPADU</div>
                <p className={`pt-[6px] text-[15px]/[23px] text-[#354A5F] ${font}`}>{c.authorDesc}</p>
              </div>
            </div>
          )}
        </div>

        <aside className="box-border w-[340px] max-w-full shrink-0 h-fit flex flex-col gap-[24px] max-lg:w-full">
          <div className="box-border w-full h-fit flex flex-col gap-[4px] p-[24px] [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[12px]">
            <div className={`text-[12px]/[16px] text-[#475E75] ${font} font-medium tracking-[1.2px] pb-[8px]`}>{c.onThisPage}</div>
            {toc.map((item, index) => (
              <span key={item} className={`text-[15px]/[20px] ${index === 0 ? "text-[#2F6E80] font-medium" : "text-[#354A5F]"} ${font} py-[6px]`}>
                {item}
              </span>
            ))}
          </div>
          <div className="box-border w-full h-fit flex flex-col gap-[14px] p-[24px] [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[12px]">
            <div className={`text-[12px]/[16px] text-[#475E75] ${font} font-medium tracking-[1.2px]`}>{c.shareLabel}</div>
            <div className="box-border w-full flex flex-row gap-[10px]">
              <span className="box-border w-[40px] h-[40px] flex items-center justify-center [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[999px] hover:bg-[#EAF3F5]">
                <Icon id="linkedin-36a16b" className="box-border w-[16px] h-[16px]" />
              </span>
              <span className="box-border w-[40px] h-[40px] flex items-center justify-center [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[999px] hover:bg-[#EAF3F5]">
                <MessageCircle size={16} className="text-[#354A5F]" />
              </span>
              <span className="box-border w-[40px] h-[40px] flex items-center justify-center [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[999px] hover:bg-[#EAF3F5]">
                <LinkIcon size={16} className="text-[#354A5F]" />
              </span>
            </div>
          </div>
          <div className="box-border w-full h-fit flex flex-col gap-[16px] p-[28px] bg-[#000354] rounded-[12px]">
            <div className={`text-[22px]/[26px] text-[#FFFFFF] ${font} font-medium`}>{c.planTitle}</div>
            <div className={`text-[15px]/[23px] text-[#FFFFFFBF] ${font}`}>{c.planDesc}</div>
            <Link href="/contact" className={`box-border w-fit h-[48px] flex items-center p-[0px_24px] bg-[#A6CBD3] hover:bg-[#B8D8DF] rounded-[8px] text-[16px]/[20px] text-[#000354] ${font} font-medium`}>
              {c.contactUs}
            </Link>
          </div>
        </aside>
      </section>

      <section className="box-border w-full h-fit flex flex-col gap-[40px] p-[96px] justify-start items-start bg-[#F5F6F7] max-lg:p-[60px_20px]">
        <div className="box-border w-full h-fit flex flex-row flex-wrap gap-[16px] justify-between items-end">
          <div className={`text-[36px]/[40px] text-[#000000] ${font} font-medium`}>{c.related}</div>
          <Link href="/blog" className={`text-[16px]/[20px] text-[#2F6E80] hover:text-[#000354] ${font} font-medium`}>{c.viewAll}</Link>
        </div>
        <div className="box-border w-full h-fit grid grid-cols-3 gap-[32px] max-lg:grid-cols-1">
          {localRelated.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} className="group box-border w-full h-fit flex flex-col gap-[16px] justify-start items-start">
              <div
                className="box-border w-full h-[220px] bg-cover bg-center rounded-[12px]"
                style={{ backgroundImage: `url(${relatedImages[item.slug]})` }}
                role="img"
                aria-label={item.title}
              />
              <div className="box-border w-full h-fit flex flex-col gap-[8px]">
                <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>{item.category.toUpperCase()}</div>
                <div className={`text-[22px]/[25px] text-[#000000] group-hover:text-[#2F6E80] transition-colors ${font} font-medium`}>{item.title}</div>
                <div className={`text-[16px]/[24px] text-[#354A5F] ${font}`}>{relatedDescriptions[item.slug]?.[lang]}</div>
              </div>
              <div className={`flex flex-row gap-[4px] items-center text-[16px]/[20px] text-[#2F6E80] group-hover:text-[#000354] transition-colors ${font} font-medium`}>
                {c.readMore}
                <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {!locked && (
        <section className="box-border w-full h-fit flex flex-col gap-[40px] p-[96px] justify-start items-start max-lg:p-[60px_20px]">
          <div className="box-border w-full max-w-[804px] h-fit flex flex-col gap-[16px]">
            <div className={`text-[30px]/[39px] text-[#000000] ${font} font-medium`}>{c.leaveComment}</div>
            <div className={`text-[14px]/[18px] text-[#475E75] ${font}`}>{c.commentNote}</div>
          </div>
          <div className="box-border w-full max-w-[804px] h-fit flex flex-col gap-[20px]">
            <div className="box-border w-full flex flex-row gap-[16px] max-sm:flex-col">
              <div className="box-border [flex:1_1_0] flex flex-col gap-[8px]">
                <span className={`text-[14px]/[18px] text-[#223548] ${font} font-medium`}>{c.name}</span>
                <span className={`h-[48px] p-[0px_16px] flex items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] rounded-[8px] text-[16px]/[20px] text-[#8396A8] ${font}`}>{c.namePh}</span>
                <span className={`text-[12px]/[15px] text-[#475E75] ${font}`}>{c.nameHelper}</span>
              </div>
              <div className="box-border [flex:1_1_0] flex flex-col gap-[8px]">
                <span className={`text-[14px]/[18px] text-[#223548] ${font} font-medium`}>{c.email}</span>
                <span className={`h-[48px] p-[0px_16px] flex items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] rounded-[8px] text-[16px]/[20px] text-[#8396A8] ${font}`}>{c.emailPh}</span>
                <span className={`text-[12px]/[15px] text-[#475E75] ${font}`}>{c.nameHelper}</span>
              </div>
            </div>
            <div className="box-border w-full flex flex-col gap-[8px]">
              <span className={`text-[14px]/[18px] text-[#223548] ${font} font-medium`}>{c.comment}</span>
              <span className={`box-border w-full h-[120px] p-[12px_16px] flex items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] rounded-[8px] text-[16px]/[21px] text-[#8396A8] ${font}`}>{c.commentPh}</span>
            </div>
            <span className={`box-border w-fit h-[48px] flex items-center p-[0px_24px] bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium`}>{c.post}</span>
          </div>
          <div className="box-border w-full max-w-[804px] h-fit flex flex-col gap-[24px]">
            <div className={`text-[20px]/[26px] text-[#000000] ${font} font-medium`}>{c.commentCount}</div>
            {c.comments.map((comment) => (
              <div key={comment.name} className="box-border w-full flex flex-row gap-[16px] items-start">
                <div className={`box-border w-[40px] h-[40px] shrink-0 flex items-center justify-center bg-[#EAF3F5] rounded-[999px] text-[14px]/[18px] text-[#000354] ${font} font-medium`}>{comment.initials}</div>
                <div className="box-border w-full flex flex-col gap-[6px]">
                  <div className="flex flex-row gap-[10px] items-center">
                    <span className={`text-[15px]/[20px] text-[#000000] ${font} font-medium`}>{comment.name}</span>
                    <span className={`text-[13px]/[17px] text-[#475E75] ${font}`}>{comment.ago}</span>
                  </div>
                  <p className={`text-[14px]/[22px] text-[#354A5F] ${font}`}>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
      <FloatingContact />
    </main>
  );
}
