import 'package:flutter_test/flutter_test.dart';
import 'package:ista_safaris/main.dart';

void main() {
  testWidgets('app starts and shows the app name', (tester) async {
    await tester.pumpWidget(const IstaApp());
    expect(find.text('ISTA Safaris'), findsOneWidget);
  });
}
