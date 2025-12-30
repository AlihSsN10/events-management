from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q
from .models import Event, Booking, Review, Favorite
from .forms import ReviewForm

def home(request):
    query = request.GET.get('q', '')
    events = Event.objects.all()
    if query:
        events = events.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(location__icontains=query)
        )
    return render(request, 'HELLO/home.html', {'events': events, 'query': query})

def event_detail(request, pk):
    event = get_object_or_404(Event, pk=pk)
    reviews = event.reviews.all()

    is_favorite = False
    user_booking = None
    if request.user.is_authenticated:
        is_favorite = Favorite.objects.filter(user=request.user, event=event).exists()
        user_booking = Booking.objects.filter(user=request.user, event=event).first()

    if request.method == 'POST' and request.user.is_authenticated:
        if 'book' in request.POST:
            num_tickets = int(request.POST.get('num_tickets', 1))
            if event.available_tickets >= num_tickets:
                Booking.objects.create(user=request.user, event=event, num_tickets=num_tickets)
                messages.success(request, f"Successfully booked {num_tickets} ticket(s)!")
            else:
                messages.error(request, "Not enough tickets available.")
            return redirect('event_detail', pk=pk)

        elif 'toggle_favorite' in request.POST:
            fav, created = Favorite.objects.get_or_create(user=request.user, event=event)
            if not created:
                fav.delete()
            return redirect('event_detail', pk=pk)

        elif 'review' in request.POST:
            form = ReviewForm(request.POST)
            if form.is_valid():
                review = form.save(commit=False)
                review.user = request.user
                review.event = event
                review.save()
                messages.success(request, "Thank you! Your review has been added.")
                return redirect('event_detail', pk=pk)

    review_form = ReviewForm()
    return render(request, 'HELLO/event_detail.html', {
        'event': event,
        'reviews': reviews,
        'is_favorite': is_favorite,
        'user_booking': user_booking,
        'review_form': review_form,
    })

@login_required
def profile(request):
    bookings = Booking.objects.filter(user=request.user).order_by('-booked_at')
    favorites = Favorite.objects.filter(user=request.user)
    return render(request, 'HELLO/profile.html', {
        'bookings': bookings,
        'favorites': favorites,
    })