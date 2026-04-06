import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FlaskConical, BrainCircuit, GraduationCap, ArrowRight, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 lg:p-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-4xl z-10">
        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 mb-8 backdrop-blur-sm">
          <FlaskConical className="mr-2 h-4 w-4" />
          <span>Phiên bản Mới - Chân Trời Sáng Tạo</span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400 pb-2">
          Hóa Học 12 Toàn Diện
        </h1>
        
        <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Nền tảng ôn thi THPT Quốc Gia môn Hóa Học thông minh. Tích hợp AI giải chi tiết, luyện đề cá nhân hóa và thuật toán Spaced Repetition giúp bạn nắm trọn điểm 9+.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full sm:w-auto">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full text-md h-14 px-8 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              Bắt đầu học ngay <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/practice" className="w-full sm:w-auto">
            <Button variant="glass" size="lg" className="w-full text-md h-14 px-8 rounded-full">
              Khám phá đề thi mẫu
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mt-8">
          <div className="glass-card p-6 rounded-2xl border-t border-t-white/10 hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Giải Bài Tập</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nhập đề hoặc chụp ảnh, AI Claude sẽ giải chi tiết từng bước theo chương trình SGK Chân Trời Sáng Tạo.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-t border-t-white/10 hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Luyện Đề THPT</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Thi thử như thật với ma trận đề 40 câu 50 phút. Phân tích chi tiết điểm mạnh, điểm yếu sau mỗi bài làm.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-t border-t-white/10 hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Học Qua Flashcard</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ghi nhớ chuỗi phản ứng, cấu trúc phân tử và tên gọi nhờ thuật toán lặp lại ngắt quãng (SM-2) cực kỳ hiệu quả.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
