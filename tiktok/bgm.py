# 32秒のオリジナルBGMを合成（numpyのみ）。usage: python3 bgm.py out.wav
import sys, wave, numpy as np

SR, DUR, BPM = 44100, 32.0, 96
BEAT = 60 / BPM; BAR = BEAT * 4
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N); R = np.zeros(N)

def hz(m): return 440 * 2 ** ((m - 69) / 12)
def add(sig, t0, gain=1.0, pan=0.0):
    i = int(t0 * SR)
    if i >= N: return
    sig = sig[:N - i] * gain
    L[i:i+len(sig)] += sig * (1 - pan) / 2 * 2 ** .5
    R[i:i+len(sig)] += sig * (1 + pan) / 2 * 2 ** .5
def lp(x, a):  # 1次ローパス
    y = np.empty_like(x); acc = 0.0
    for k in range(len(x)): acc += a * (x[k] - acc); y[k] = acc
    return y

def pad(notes, dur):
    t = np.arange(int(dur * SR)) / SR
    s = sum(np.sin(2*np.pi*hz(m)*d*t) + .3*np.sin(4*np.pi*hz(m)*d*t) for m in notes for d in (0.997, 1.003))
    env = np.minimum(1, t / 0.6) * np.minimum(1, (dur - t) / 0.5)
    return s * env / len(notes) / 2
def keys(m, dur=0.9):
    t = np.arange(int(dur * SR)) / SR
    s = np.sin(2*np.pi*hz(m)*t) + .25*np.sin(4*np.pi*hz(m)*t)*np.exp(-t*8)
    return s * np.exp(-t * 4) * np.minimum(1, t / .005)
def bass(m, dur):
    t = np.arange(int(dur * SR)) / SR
    return (np.sin(2*np.pi*hz(m)*t) + .2*np.sin(4*np.pi*hz(m)*t)) * np.exp(-t*1.5) * np.minimum(1, t/.01) * np.minimum(1, (dur-t)/.05)
def kick():
    t = np.arange(int(.35 * SR)) / SR
    f = 50 + 90 * np.exp(-t * 30)
    return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t * 9)
def hat():
    t = np.arange(int(.06 * SR)) / SR
    n = rng.standard_normal(len(t)); n = n - lp(n, .3)
    return n * np.exp(-t * 70)
def snap():
    t = np.arange(int(.18 * SR)) / SR
    n = rng.standard_normal(len(t)); n = n - lp(n, .08)
    return n * np.exp(-t * 28)

# 4-5-3-6 進行（F△7 - G6 - Em7 - Am7）
CH = [([53, 57, 60, 64], 41), ([55, 59, 62, 64], 43), ([52, 55, 59, 62], 40), ([57, 60, 64, 67], 45)]
ARP = [0, 2, 1, 3, 2, 1, 3, 2]
nbars = int(np.ceil(DUR / BAR))
for b in range(nbars):
    t0 = b * BAR
    notes, root = CH[b % 4]
    intro = t0 < 10            # 0-10秒：悩みパート（静か）
    add(pad(notes, BAR + .4), t0, .10 if intro else .08)
    for k, idx in enumerate(ARP):   # 8分音符のアルペジオ
        add(keys(notes[idx] + 12), t0 + k * BEAT / 2, .10 if intro else .13, pan=(-.4 if k % 2 else .4))
    if not intro:              # 10秒〜：ビートとベースが入る
        for k in range(4):
            bt = t0 + k * BEAT
            if k in (0, 2): add(kick(), bt, .55)
            if k in (1, 3): add(snap(), bt, .16)
            add(hat(), bt + BEAT / 2, .10, pan=.3)
        add(bass(root - 12, BEAT * 1.5), t0, .30); add(bass(root - 12, BEAT * 2), t0 + BEAT * 2, .26)
    if t0 >= 22.5:             # 22秒〜：盛り上げ（16分ハット追加）
        for k in range(16): add(hat(), t0 + k * BEAT / 4, .05, pan=-.3)

t = np.arange(N) / SR
fade = np.minimum(1, t / 0.3) * np.minimum(1, (DUR - t) / 1.5)
mix = np.stack([L, R], 1) * fade[:, None]
mix /= np.abs(mix).max() / 0.8
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
