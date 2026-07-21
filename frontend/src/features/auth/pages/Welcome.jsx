import { Link } from 'react-router-dom';
// NOTE: useAuth isn't needed on this page — nothing here reads auth state
// or calls login/logout. Only import what you actually use.

export default function Welcome() {
    return (
        <div className="min-h-screen flex flex-col">

            {/* Header — this part was already correct, good job */}
            <div className="flex flex-row justify-between items-center bg-teal-500 text-white px-6 py-4">
                {/* FIX: "text-x1" (letter L not digit 1) → "text-xl" (the digit one) */}
                <div className="font-bold text-xl">TshwaneRide</div>

                {/* FIX: same bug as before — "right=0" isn't a class, it's junk text
                    stuck inside className. Deleted it. Added flex + gap to space
                    the two buttons apart nicely instead. */}
                <div className="flex gap-3">
                    {/* FIX: swapped onClick+window.location for <Link>.
                        Link does client-side routing (no full page reload).
                        window.location.href forces a full browser refresh —
                        wrong tool for in-app navigation. */}
                    <button to="/login" className="bg-slate-700 text-white px-4 py-2 rounded-full">
                        Login
                    </button>
                    <button to="/register" className="bg-slate-700 text-white px-4 py-2 rounded-full">
                        Register
                    </button>
                </div>
            </div>

            {/* FIX: "Main-content" / "flex=1" / "contentAlignment=center" /
                "backgroundColor=bg-emerald-50" were all invalid — same
                key=value-inside-className mistake as before.
                flex-1 makes this section grow to fill remaining height.
                justify-center + items-center centers the card both ways. */}
            <div className="flex-1 flex justify-center items-center bg-emerald-50 p-6">

                {/* FIX: "card icon=🚗" wasn't valid either. There is no such
                    thing as an "icon" className — an emoji/icon has to be
                    actual content INSIDE the element, not a prop on it.
                    Added real card styling: white bg, padding, rounded corners, shadow. */}
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">

                    {/* Emoji is now real content, not a fake prop */}
                    <div className="text-4xl mb-4">🚗</div>

                    {/* FIX: contentAlignment="center" isn't a real attribute on
                        <h1>. Text alignment is a Tailwind class: text-center */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-3">
                        Your bus card can be managed online
                    </h1>

                    {/* FIX: same pattern — textColor and contentAlignment
                        replaced with text-gray-600 and text-center */}
                    <p className="text-gray-600 text-center mb-6">
                        Top up and manage your bus card without visiting a station.
                        Get instant virtual access to your account.
                    </p>

                    <label className="block font-semibold mb-2">Language</label>
                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2"
                        onChange={(e) => {
                            // TODO: this is a stub — later this will call your
                            // i18n switch function (from the i18n/ folder),
                            // not touch auth at all
                        }}
                    >
                        <option value="en">English</option>
                        <option value="zu">IsiZulu</option>
                    </select>
                </div>
            </div>

            {/* FIX: backgroundColor="bg-teal-500" as an attribute → moved
                inside className, plus added text-center + padding + text-sm
                since a footer shouldn't be huge default text */}
            <div className="bg-teal-500 text-white text-center py-3 text-sm">
                <p>© 2026 TshwaneRide. All rights reserved.</p>
            </div>

        </div>
    );
}